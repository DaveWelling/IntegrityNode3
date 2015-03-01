angular.module('workitemTreeModule').directive('workitemTree', function(){
    return {
        templateUrl: 'src/workitemTreeModule/templateTree.html',
        restrict: 'E',
        scope:{},
        controller: function($scope, $element){
            //$scope.data = [{title:"", nodes:{}}];
            $scope.data = [
                {title: "hello", nodes:
                    [
                        {title:"world", nodes:[
                            {title:"below world", nodes:[]},
                            {title:"below world 2", nodes:[]}
                        ]},
                        {title: "suck it", nodes: []}
                    ]
                }
            ];

            $scope.toggle = function(scope) {
                scope.toggle();
            };
        }
    }
});
