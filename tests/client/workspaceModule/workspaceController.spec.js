describe("workspaceController", function(){
    beforeEach(function(){
        var that = this;
        module('workitemModule', function($provide) {
            that.mockWorkitemService = {
                "get": sinon.spy(),
                "create": sinon.spy()
            };
            $provide.value('workitemService', that.mockWorkitemService )
        });
        module('workspaceModule', function($provide) {
            that.mockWorkspaceService = {
                "get": sinon.stub(),
                "create": sinon.spy()
            };
            $provide.value('workspaceService', that.mockWorkspaceService)
        });
        inject(function($controller, $rootScope){
            that.scope = $rootScope.$new();
            that.getWorkspaceController = function(routeParams){
                $controller('workspaceController',{
                    '$routeParams': routeParams,
                    '$scope': that.scope
                });
            }
        });
    });

    it("should request the workspace from the service if an id is given", function(){
        var id = cuid();
        this.mockWorkspaceService.get.returns({"rootWorkitemId": cuid()});
        this.getWorkspaceController({"workspaceId": id});
        expect(this.mockWorkspaceService.get.withArgs(id).calledOnce).toBe(true);
    });
    it("should create a new workspace if an id is not given", function(){
        this.getWorkspaceController();
        expect(this.mockWorkspaceService.create.calledOnce).toBe(true);
    });
    it("should initiate a new root workitem if one does not exist in the workspace", function(){
        expect(this.scope.rootWorkitem).not.toBe(null);
    });
    it("should save a new root workitem if one does not exist in the workspace", function(){
        this.getWorkspaceController(); // Create a new workspace
        expect(this.mockWorkitemService.create.calledOnce).toBe(true);
    });
    it("should save a new root workspace if the given id does not exist", function(){
        this.mockWorkspaceService.get.returns(null);  // service returns null for id
        this.getWorkspaceController({"workspaceId": cuid()});
        expect(this.mockWorkspaceService.create.calledOnce).toBe(true);
    });

});