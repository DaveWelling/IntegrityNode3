angular.module("workspaceModule").controller("workspaceController",
	["$routeParams", "$scope", "workspaceService", "workitemService", function (
		routeParams, $scope, workspaceService, workitemService
	) {
		$scope.loadingDone = false;

		function createNewWorkspace() {
			holdWorkspace = {
				"id": cuid(), "title": "New Workplace", "rootWorkitemId": cuid()
			};
			return workspaceService.create(holdWorkspace);
		}

		function createNewRootWorkitem() {
			holdWorkitem = {
				"id": cuid(), "title": "", "nodes": []
			};
			return workitemService.create(holdWorkitem);
		}

		// Get the workspace
		var workspacePromise;
		if (routeParams && routeParams.workspaceId) {
			workspacePromise = workspaceService.get(routeParams.workspaceId)
		} else {
			workspacePromise = createNewWorkspace();
		}

		// Get the root workitem
		workspacePromise.then(function (workspace) {
			if (!workspace){
				return createNewWorkspace().then(function(newWorkspace){
					$scope.workspace = newWorkspace;
					return getRootWorkitem(newWorkspace);
				});
			} else{
				$scope.workspace = workspace;
				return getRootWorkitem(workspace);
			}

			function getRootWorkitem(workspaceWithId){
				if (workspaceWithId.rootWorkitemId) {
					return workitemService.get(workspaceWithId.rootWorkitemId);
				} else {
					return createNewRootWorkitem().then(function (newWorkitem) {
						workspace.rootWorkitemId = newWorkitem.id;
						return workitemService.update(workspaceWithId);
					});
				}
			}
		}).then(function (workitem) {
			$scope.rootWorkitem = workitem;
			$scope.loadingDone = true;
		}, function (err) {
			// Todo: add error handling here
			throw Error("error handling not implemented.  Error:" + err);
		});

	}]);


