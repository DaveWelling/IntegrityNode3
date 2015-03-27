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

//http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/editing-text-in-place-using-html5-content-editable.html
angular.module("workitemModule").directive("contenteditable", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
        }
    };
});
