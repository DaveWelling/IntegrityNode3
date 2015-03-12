angular.module("workitemModule")
    .service("workitemService", ["socketApiFactory", function(socketApiFactory){
        this.get = function(id){
            socketApiFactory.emit("workitem.get", id);
        };
        this.create = function(workspace){
            socketApiFactory.emit("workitem.create", workspace);
        };
        this.update = function(update){
            socketApiFactory.emit("workitem.update", update);
        };
        this.delete = function(id){
            socketApiFactory.emit("workitem.delete", id);
        };
    return this;
}]);
