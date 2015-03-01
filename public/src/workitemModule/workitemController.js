angular.module("workitemModule").controller('workitemController', function($scope, $element){
    function saveWorkitemTitle(){
        console.log($scope.item.title);
    }
    $scope.editMode = false;
    $scope.titleKeyPress = function(keyEvent){
        if (keyEvent.which === 13){
            saveWorkitemTitle()
        }

    };
    $scope.buttonPushed = function(){
        saveWorkitemTitle();
    };
});
