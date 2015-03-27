describe("Workspace integration tests", function () {
	beforeEach(function () {
		var that = this;
		module("commonModule", function ($provide) {
			that.testSocket = (function () {
				var ioConnection = io.connect("http://localhost:3000");
				ioConnection.on("connect", function(){
					console.log("A connection was established.");
				});
				return ioConnection;
			})();

			$provide.value('socketShell', that.testSocket);
			$provide.value('$q', Q); // Sub out angular $q with Kriskowal's to avoid needing to call rootScope.$apply()
		});
		module("workspaceModule", function($provide){
			$provide.value('$q', Q); // Sub out angular $q with Kriskowal's to avoid needing to call rootScope.$apply()
		});
		inject(function (workspaceService, $rootScope) {
			that.target = workspaceService;
			that.rootScope = $rootScope;
		});
	});
	describe("Save a new workspace", function () {
		it("should return the workspace created", function (done) {
			var workspaceToSend = {
				"id": cuid(),
				"title": "test workspace"
			};
			this.target.create(workspaceToSend).then(function (result) {
				expect(result.id).to.equal(workspaceToSend.id);
				expect(result.title).to.equal(workspaceToSend.title);
				done();
			}, function (err) {
				done(err);
			});
		});
	});
	describe("Acquire the default 'Home' workspace", function () {
		it("should return normally", function(done){
			this.target.getRootWorkspace().then(function (result) {
				expect(result.title).to.equal("Home");
				done();
			}, function (err) {
				done(err);
			});
		});
	});
	describe("Update an existing workspace", function () {
		it("should return an updated workspace", function(done){
			var that = this;
			var originalTitle = "original title";
			var changedTitle = "changed title";
			var originalId = cuid();
			var testWorkspace = {
				title: originalTitle,
				id: originalId
			};
			that.target.create(testWorkspace).then(function(insertedWorkspace){
				expect(insertedWorkspace.title).to.equal(originalTitle);
				expect(insertedWorkspace.id).to.equal(originalId);
				testWorkspace.title = changedTitle;
				that.target.update(testWorkspace).then(function (result) {
						expect(result.title).to.equal(changedTitle);
						expect(result.id).to.equal(originalId);
						done();
				}, function(err){
					done(err);
				});
			});
		});
	});
	describe("Remove a workspace", function () {
		it("should return the deleted id", function(done){
			var that = this;
			var testWorkspace = {
				title: "some title",
				id: cuid()
			};
			// create it, delete it, then get call should give null
			that.target.create(testWorkspace)
				.then(that.target.remove)
				.then(that.target.get)
				.then(function(getResult){
						expect(getResult).to.equal(null);
						done();
				}, done);
		})
	});
});
