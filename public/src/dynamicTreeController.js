angular.module("app").controller('dynamicTreeController', ['$scope', '$http', function($scope, $http) {

	function addExpandAllCollapseAll($scope) {
		function rec(nodes, action) {
			for (var i = 0 ; i < nodes.length ; i++) {
				action(nodes[i]);
				if (nodes[i].children) {
					rec(nodes[i].children, action);
				}
			}
		}
		$scope.collapseAll = function () {
			rec($scope.treeData, function (node) {
				node.collapsed = true;
			});
		};
		$scope.expandAll = function () {
			rec($scope.treeData, function (node) {
				node.collapsed = false;
			});
		};
	}
	addExpandAllCollapseAll($scope);
	$scope.bindToTree = function(){
		//$scope.$apply($scope.treeData = $scope.jsonTreeData);
		$scope.treeData = $scope.jsonTreeData;
	};
	$scope.treeData = [];
	//$scope.$watch("treeData", function(newValue, oldValue){
	//	if (newValue !== oldValue && $scope.jsonTreeData !== $scope.treeData) {
	//		$scope.jsonTreeData = $scope.treeData;
	//	}
	//});
	$scope.getJsonFromTree = function(){
		$scope.jsonTreeData = $scope.treeData;
	};
	$scope.jsonTreeData = [
		{
			'title': 'root 0',
			'links': [
				{'title':'root 0 child 0'},{'title':'root 0 child 1'}
			]
		},
		{
			'title': 'root 1',
			'links': [
				{'title':'root 1 child 0'},{'title':'root 1 child 1'}
			]
		}
	];
	$scope.action = function(node) {
		alert("Action on node : " + node.label);
	};
}]);
