describe("workspaceController", function(){
    var mockWorkspaceService = {
        "get": sinon.spy(),
        "create": sinon.spy()
    };
    beforeEach(module('workspaceModule', function($provide) {
        $provide.value('workspaceService', mockWorkspaceService)
    }));
    //beforeEach(module('appX'));
    //it("ucks to be you", inject(function($rootScope){
    //
    //}));
    //it("fuck a duck", inject(function($rootScope, $controller){
    //    var scope = $rootScope.$new();
    //    var ctrl = $controller('fuckaduck', {$scope: scope});
    //
    //}));
    describe("constructor", function(){
        var getWorkspaceController;
        var service;
        var scope;
        beforeEach(inject(function($controller, $rootScope){

            scope = $rootScope.$new();
            getWorkspaceController = function(routeParams){
                $controller('workspaceController',{
                    '$routeParams': routeParams,
                    '$scope': scope
                });
            }
        }));
        it("should request the workspace from the service if an id is given", function(){
            var id = cuid();
            workspaceController = getWorkspaceController({"workspaceId": id});
            expect(mockWorkspaceService.get.withArgs(id).calledOnce).toBe(true);
        });
        it("should create a new workspace if an id is not given", function(){
            workspaceController = getWorkspaceController();
            expect(mockWorkspaceService.create.calledOnce).toBe(true);
        });
        it("should initiate a new document if one does not exist in the workspace", function(){
            expect(scope.focusDocument).not.toBe(null);
        });
        it("if a document exists as the workspace root, it should show it", function(){
            var id = cuid();

        });
    });

});

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
;});