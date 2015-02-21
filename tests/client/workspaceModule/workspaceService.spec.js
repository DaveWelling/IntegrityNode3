


describe("workspaceService", function(){
    var mockSocketFactory;
    var target;
    beforeEach(module('workspaceModule', function($provide) {
        mockSocketFactory = {emit: sinon.spy()};
        $provide.value('socketApi', mockSocketFactory);
    }));
    beforeEach(inject(function($injector) {
        target = $injector.get('workspaceService');
    }));
    it("get should request a workspace from server using a given id", function(){
        var id = cuid();
        target.get(id);
        expect(mockSocketFactory.emit.withArgs("workspace.get", id).calledOnce).toBe(true);
    });
    it("create should send a new workspace to the server", function(){
        var workspace = {"id": cuid(), "name": "test workspace"};
        target.create(workspace);
        expect(mockSocketFactory.emit.withArgs("workspace.create", workspace).calledOnce).toBe(true);
    });
    it("update should send a change for a workspace to the server", function(){
        var update = {
            "id": cuid(),
            "name": "some changed value"
        };
        target.update(update);
        expect(mockSocketFactory.emit.withArgs("workspace.update", update).calledOnce).toBe(true);
    });
    it("delete should send a request to remove a workspace to the server using a given id", function(){
        var id = cuid();
        target.delete(id);
        expect(mockSocketFactory.emit.withArgs("workspace.delete", id).calledOnce).toBe(true);
    });
    it("getRootWorkspace should send a getRootWorkspace request to the server", function(){
        target.getRootWorkspace();
        expect(mockSocketFactory.emit.withArgs("workspace.getRootWorkspace").calledOnce).toBe(true);
    });
});