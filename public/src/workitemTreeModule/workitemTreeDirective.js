angular.module('workitemTreeModule')
    .directive('workitemTree'
    , function () {
        return {
            templateUrl: 'src/workitemTreeModule/templateTree.html',
            restrict: 'E',
            scope: {
                node: "=ngModel"
            },
            link: function ($scope, $element) {
                // ToDo: get root node for workspace root node id
                $scope.toggle = function (scope) {
                    scope.toggle();
                };
            }
        }
    })
    .directive('workitemTreeBough'
    , function () {
        return{
            templateUrl: 'src/workitemTreeModule/templateBough.html',
            restrict: 'E',
            scope: {
                node: "=ngModel"
            },
            link: function($scope){

            }
        }

    });
