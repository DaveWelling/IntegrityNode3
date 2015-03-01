angular.module("workspaceModule").directive("workspaceDirective", ["workspaceController", function(workspaceController){
    return {
        restrict: 'AE',
        replace: true,
        controller: workspaceController,
        template: function(tElement, tAttrs){
            return '';
        }
    }
}]);
