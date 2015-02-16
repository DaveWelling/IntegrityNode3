angular.module("workspaceModule").factory('socketApi', function () {
    GetRootUrl = function () {
        var root = location.hostname;
        return location.protocol + "//" + root + ":59682/socketApi";
    };
    return io.connect(GetRootUrl());
});

angular.module("workspaceModule").service('workspaceService', ["socketApi",  function (socketApi) {
    this.get = function(id){
        socketApi.emit("workspace.get", id);
    };
    this.create = function(workspace){
        socketApi.emit("workspace.create", workspace);
    };
    this.update = function(update){
        socketApi.emit("workspace.update", update);
    };
    this.delete = function(id){
        socketApi.emit("workspace.delete", id);
    };

    return this;
}]);
