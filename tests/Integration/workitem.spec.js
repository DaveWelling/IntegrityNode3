describe("Workitem integration tests", function () {
	beforeEach(function () {
		var that = this;
		module("commonModule", function ($provide) {
			that.testSocket = (function () {
				var ioConnection = io.connect("http://localhost:3000");
				ioConnection.on("connect", function () {
					console.log("A connection was established.");
				});
				return ioConnection;
			})();

			$provide.value('socketShell', that.testSocket);
			$provide.value('$q', Q); // Sub out angular $q with Kriskowal's to avoid needing to call rootScope.$apply()
		});
		module("workitemModule", function ($provide) {
			$provide.value('$q', Q); // Sub out angular $q with Kriskowal's to avoid needing to call rootScope.$apply()
		});
		inject(function (workitemService, $rootScope) {
			that.target = workitemService;
			that.rootScope = $rootScope;
		});
	});

	describe("Save a new workitem", function () {
		it("should return the workitem created", function (done) {
			var workitemToSend = {
				"id": cuid(),
				"title": "test workitem"
			};
			this.target.create(workitemToSend).then(function (result) {
				expect(result.id).to.equal(workitemToSend.id);
				expect(result.title).to.equal(workitemToSend.title);
				done();
			}, function (err) {
				done(err);
			});
		});
	});

	describe("Update an existing workitem", function () {
		it("should return an updated workitem", function(done){
			var that = this;
			var originalTitle = "original title";
			var changedTitle = "changed title";
			var originalId = cuid();
			var testWorkitem = {
				title: originalTitle,
				id: originalId
			};
			that.target.create(testWorkitem).then(function(insertedWorkitem){
				expect(insertedWorkitem.title).to.equal(originalTitle);
				expect(insertedWorkitem.id).to.equal(originalId);
				testWorkitem.title = changedTitle;
				that.target.update(testWorkitem).then(function (result) {
					expect(result.title).to.equal(changedTitle);
					expect(result.id).to.equal(originalId);
					done();
				}, function(err){
					done(err);
				});
			});
		});
	});

	describe("Remove a workitem", function () {
		it("should return the deleted id", function(done){
			var that = this;
			var testWorkitem = {
				title: "some title",
				id: cuid()
			};
			// create it, delete it, then get call should give null
			that.target.create(testWorkitem)
				.then(that.target.remove)
				.then(that.target.get)
				.then(function(getResult){
					expect(getResult).to.equal(null);
					done();
				}, done);
		})
	});
});
