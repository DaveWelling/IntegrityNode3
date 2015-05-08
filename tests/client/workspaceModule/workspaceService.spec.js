


describe("workspaceService", function(){
    beforeEach(function(){
        var that = this;
        module('commonModule', function($provide) {
            that.mockSocketTraffic = {
                request: sinon.spy(),
                respond: sinon.spy()
            };
            $provide.value('socketTraffic', that.mockSocketTraffic);
        });
        module('workspaceModule');
        inject(function($injector) {
            that.target = $injector.get('workspaceService');
        });
    });
    it("get should request a workspace from server using a given id", function(){
        var id = cuid();
        this.target.get(id);
        expect(this.mockSocketTraffic.request.withArgs("workspace.get", id)
            .calledOnce).toBe(true);
    });
    it("create should send a new workspace to the server", function(){
        var workspace = {"id": cuid(), "title": "test workspace"};
        this.target.create(workspace);
        expect(this.mockSocketTraffic.request.withArgs("workspace.create", workspace)
            .calledOnce).toBe(true);
    });
    it("update should send a change for a workspace to the server", function(){
        var update = {
            "id": cuid(),
            "title": "some changed value"
        };
        this.target.update(update);
        expect(this.mockSocketTraffic.request.withArgs("workspace.update", update)
            .calledOnce).toBe(true);
    });
    it("remove should send a request to remove a workspace to the server using a given id", function(){
        var id = cuid();
        this.target.remove(id);
        expect(this.mockSocketTraffic.request.withArgs("workspace.remove", id)
            .calledOnce).toBe(true);
    });
	it("remove can also accept a workspace object to delete", function(){
		var workspaceToDelete = {
			id: cuid(),
			title: "blah"
		};
		this.target.remove(workspaceToDelete);

		expect(this.mockSocketTraffic.request.withArgs("workspace.remove", workspaceToDelete.id)
			.calledOnce).toBe(true);
	});
    it("getRootWorkspace should send a getRootWorkspace request to the server", function(){
        this.target.getRootWorkspace();
        expect(this.mockSocketTraffic.request.withArgs("workspace.getRootWorkspace")
            .calledOnce).toBe(true);
    });
});