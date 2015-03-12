


describe("workspaceService", function(){
    beforeEach(function(){
        var that = this;
        module('commonModule', function($provide) {
            that.mockSocketFactory = {emit: sinon.spy()};
            $provide.value('socketApiFactory', that.mockSocketFactory);
        });
        module('workspaceModule');
        inject(function($injector) {
            that.target = $injector.get('workspaceService');
        });
    });
    it("get should request a workspace from server using a given id", function(){
        var id = cuid();
        this.target.get(id);
        expect(this.mockSocketFactory.emit.withArgs("workspace.get", id)
            .calledOnce).toBe(true);
    });
    it("create should send a new workspace to the server", function(){
        var workspace = {"id": cuid(), "name": "test workspace"};
        this.target.create(workspace);
        expect(this.mockSocketFactory.emit.withArgs("workspace.create", workspace)
            .calledOnce).toBe(true);
    });
    it("update should send a change for a workspace to the server", function(){
        var update = {
            "id": cuid(),
            "name": "some changed value"
        };
        this.target.update(update);
        expect(this.mockSocketFactory.emit.withArgs("workspace.update", update)
            .calledOnce).toBe(true);
    });
    it("delete should send a request to remove a workspace to the server using a given id", function(){
        var id = cuid();
        this.target.delete(id);
        expect(this.mockSocketFactory.emit.withArgs("workspace.delete", id)
            .calledOnce).toBe(true);
    });
    it("getRootWorkspace should send a getRootWorkspace request to the server", function(){
        this.target.getRootWorkspace();
        expect(this.mockSocketFactory.emit.withArgs("workspace.getRootWorkspace")
            .calledOnce).toBe(true);
    });
});