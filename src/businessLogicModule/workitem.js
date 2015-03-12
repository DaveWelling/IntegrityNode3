(function(workitem){
    var repository = require("../mongoRepositoriesModule");

    workitem.init = function(io){
        io.on("workitem.get", workitem.get);
        io.on("workitem.create", workitem.create);
        io.on("workitem.update", workitem.update);
        io.on("workitem.delete", workitem.delete);
        io.on("workitem.getRootworkitem", workitem.getRootworkitem);
    };
    workitem.get = function(id, callback){
        var workitem = repository.workitems.get(id);
        callback(workitem);
    };
    workitem.update = function(update){
        return repository.workitems.update(update);
    };
    workitem.delete = function(id){
        return repository.workitems.delete(id)
    };
    workitem.create = function(workitem){
        return repository.workitems.insert(workitem);
    };
    workitem.getRootworkitem = function(noData, callback){
        workitem.get(repository.workitems.getRootworkitemCuid(), callback);
    }
})(module.exports);
