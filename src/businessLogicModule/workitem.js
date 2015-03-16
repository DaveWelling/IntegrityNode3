(function(workitem){
    var repository = require("../mongoRepositoriesModule");

    workitem.init = function(socketTraffic){
        socketTraffic.respond("workitem.get", workitem.get);
        socketTraffic.respond("workitem.create", workitem.create);
        socketTraffic.respond("workitem.update", workitem.update);
        socketTraffic.respond("workitem.remove", workitem.remove);
    };
    workitem.get = function(id){
        return repository.workitems.get(id);
    };
    workitem.update = function(update){
        return repository.workitems.update(update);
    };
    workitem.remove = function(id){
        return repository.workitems.remove(id)
    };
    workitem.create = function(workitem){
        console.log("Workitem create: " + workitem.title);
        return repository.workitems.insert(workitem);
    };
})(module.exports);
