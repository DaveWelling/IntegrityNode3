angular.module("app", ['ngRoute', 'workspaceModule'])
    .config(["$routeProvider", function(routes){
        routes.when("/workspace", {
            templateUrl: "/partials/workspace.html",
            controller: "workspaceController"
        })
        .when("/workspace/:workspaceId", {
            templateUrl: "/partials/workspace.html",
            controller: "workspaceController"
        });
    }]);