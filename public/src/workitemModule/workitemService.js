angular.module("workitemModule")
    .service("workitemService", ["socketTraffic", function(socketTraffic){
        this.get = function(id){
            return socketTraffic.request("workitem.get", id);
        };
        this.create = function(workitem){
            return socketTraffic.request("workitem.create", workitem);
        };
        this.update = function(update){
            return socketTraffic.request("workitem.update", update);
        };
        this.remove = function(id){
            return socketTraffic.request("workitem.remove", id);
        };
    return this;
}]);
