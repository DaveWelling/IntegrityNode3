angular.module("workspaceModule")
    .service('workspaceService', ["$q", "socketTraffic",  function ($q, socketTraffic) {
    this.get = function(id){
        return socketTraffic.request("workspace.get", id);
    };
    this.create = function(workspace){
		return socketTraffic.request("workspace.create", workspace);
    };
    this.update = function(update){
        return socketTraffic.request("workspace.update", update);
    };
    this.remove = function(toRemove){
		if (toRemove.id){
			return socketTraffic.request("workspace.remove", toRemove.id);
		}
        return socketTraffic.request("workspace.remove", toRemove);
    };
    this.getRootWorkspace = function(){
        return socketTraffic.request("workspace.getRootWorkspace");
    };
    return this;
}]);
