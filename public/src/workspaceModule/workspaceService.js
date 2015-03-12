angular.module("workspaceModule")
    .service('workspaceService', ["socketApiFactory",  function (socketApiFactory) {
    this.get = function(id){
        socketApiFactory.emit("workspace.get", id);
    };
    this.create = function(workspace){
        socketApiFactory.emit("workspace.create", workspace);
    };
    this.update = function(update){
        socketApiFactory.emit("workspace.update", update);
    };
    this.delete = function(id){
        socketApiFactory.emit("workspace.delete", id);
    };
    this.getRootWorkspace = function(){
        socketApiFactory.emit("workspace.getRootWorkspace");
    };

    return this;
}]);
