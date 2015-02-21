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