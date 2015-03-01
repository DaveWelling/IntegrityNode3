angular.module("workspaceModule")
    .controller("workspaceController", ["$routeParams", "$scope", "workspaceService", function (routeParams, $scope, service) {
        var holdWorkspace;
        if (routeParams && routeParams.workspaceId) {
            holdWorkspace = service.get(routeParams.workspaceId)
        } else {
            holdWorkspace = {
                "id": cuid(),
                "name": "New Workplace"
            };
            service.create(holdWorkspace);
        }
        $scope.focusDocument = {};
        $scope.workplace = holdWorkspace;
    }]);


