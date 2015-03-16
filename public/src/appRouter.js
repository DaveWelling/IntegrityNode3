angular.module("app").config(["$routeProvider", "constant", function(routes, constant){
    routes
        .when("/workspace", {
            templateUrl: "src/workspaceModule/workspace.html",
            controller: "workspaceController"
        })
        .when("/workspace/:workspaceId", {
            templateUrl: "src/workspaceModule/workspace.html",
            controller: "workspaceController"
        })
        .otherwise({
            redirectTo: "/workspace/"+constant.defaultWorkspaceId
        })
}]);
