angular.module("app").constant('appConfig', {
        "defaultWorkspaceId": "ci5cs8jnf00047wmxojtae5mm"
    })
    .config(["$routeProvider","appConfig", function(routes,appConfig){
    routes.when("/workspace", {
        templateUrl: "src/workspaceModule/workspace.html",
        controller: "workspaceController"
    })
        .when("/workspace/:workspaceId", {
            templateUrl: "src/workspaceModule/workspace.html",
            controller: "workspaceController"
        })
        .otherwise({
            redirectTo: "/workspace/"+appConfig.defaultWorkspaceId
        })
}]);
