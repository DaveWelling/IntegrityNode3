angular.module("workitemModule").directive("workitem",["workitemService", function(workitemService){
    return {
        templateUrl: 'src/workitemModule/templateWorkitem.html',
        restrict: 'E',
        scope: {
            node: "=ngModel",
            hasFocus: "="
        },
        controller: function($scope, $element, $attrs){
            //var treeNodeHandle = $scope.$parent;
            //var treeNode = treeNodeHandle.$parent;
            function saveWorkitemTitle(){
                workitemService.create({"title": $scope.node.title});
            }
            function addSibling(){
                $scope.$emit("addSibling", $scope.node);
            }
            $scope.titleKeyPress = function(keyEvent){
                if (keyEvent.which === 13){
                    keyEvent.preventDefault();
                    saveWorkitemTitle();
                    addSibling();
                }
            };
            //if (treeNode.depth() === 1){
            if ($scope.hasFocus) {
                $element.children(".workitemContent")[0].focus();
            }
        }
        //controller: 'workitemController'
    }
}]);

