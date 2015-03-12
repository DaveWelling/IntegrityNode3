angular.module("workspaceModule")
    .controller("workspaceController", ["$routeParams", "$scope", "workspaceService", "workitemService"
        , function (routeParams, $scope, workspaceService, workitemService) {
        var holdWorkspace;
        var holdRootWorkitem;
        if (routeParams && routeParams.workspaceId) {
            holdWorkspace = workspaceService.get(routeParams.workspaceId)
        }
        if (holdWorkspace) {
            holdRootWorkitem = workitemService.get(holdWorkspace.rootWorkitemId);
        } else {
            holdWorkspace = {
                "id": cuid(),
                "name": "New Workplace",
                "rootWorkitemId": cuid()
            };
            holdRootWorkitem = {
                "id": cuid(),
                "title": ""
            };
            workspaceService.create(holdWorkspace);
            workitemService.create(holdRootWorkitem);
        }
        $scope.workplace = holdWorkspace;
        $scope.rootWorkitem = holdRootWorkitem;
    }]);


