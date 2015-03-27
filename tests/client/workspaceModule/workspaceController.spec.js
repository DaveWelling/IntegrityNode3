describe("workspaceController", function () {
	beforeEach(function () {
		var that = this;

		that.defaultWorkitem = {
			id: cuid(),
			title: "default workitem",
			nodes:[]
		};
		that.defaultWorkspace = {
			title: "default workspace",
			rootWorkitemId: that.defaultWorkitem.id
		};
		module('workitemModule', function ($provide) {
			var defer = jQuery.Deferred();
			defer.resolve(that.defaultWorkitem);
			var workitemPromise = defer.promise();
			that.mockWorkitemService = {
				"get": sinon.stub().returns(workitemPromise),
				"create": sinon.stub().returns(workitemPromise),
				"update": sinon.stub().returns(workitemPromise)
			};
			$provide.value('workitemService', that.mockWorkitemService)
		});

		module('workspaceModule', function ($provide) {
			var defer = jQuery.Deferred();
			defer.resolve(that.defaultWorkspace);
			var workspacePromise = defer.promise();
			that.mockWorkspaceService = {
				"get": sinon.stub().returns(workspacePromise),
				"create": sinon.stub().returns(workspacePromise),
				"update": sinon.stub().returns(workspacePromise)
			};
			$provide.value('workspaceService', that.mockWorkspaceService)
		});

		inject(function ($controller, $rootScope) {
			that.scope = $rootScope.$new();
			that.getWorkspaceController = function (routeParams) {
				$controller('workspaceController', {
					'$routeParams': routeParams, '$scope': that.scope
				});
			}
		});
	});

	it("should request the workspace from the service if an id is given", function () {
		var id = cuid();
		this.getWorkspaceController({"workspaceId": id});
		expect(this.mockWorkspaceService.get.withArgs(id).calledOnce).toBe(true);
	});

	it("should create a new workspace if an id is not given", function () {
		this.getWorkspaceController();
		expect(this.mockWorkspaceService.create.calledOnce).toBe(true);
	});

	it("should initiate a new root workitem if one does not exist in the workspace", function () {
		expect(this.scope.rootWorkitem).not.toBe(null);
	});

	it("should save a new root workitem if one does not exist in the workspace", function (done) {
		var that = this;
		that.defaultWorkspace.rootWorkitemId = null;
		this.getWorkspaceController(); // Create a new workspace
		this.scope.$watch("loadingDone", function (newVal, oldVal, scope) {
			if (newVal) {
				expect(that.mockWorkitemService.create.calledOnce).toBe(true);
				done();
			}
		});
		this.scope.$apply();
	});

	it("should save a new root workspace if the given id does not exist", function () {

		var defer = jQuery.Deferred();
		defer.resolve(null);
		var workspacePromise = defer.promise();
		this.mockWorkspaceService.get.returns(workspacePromise);
		this.getWorkspaceController({"workspaceId": cuid()});
		expect(this.mockWorkspaceService.create.calledOnce).toBe(true);
	});

});