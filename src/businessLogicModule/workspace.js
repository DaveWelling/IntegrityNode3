(function(workspace){
    var repository = require("../mongoRepositoriesModule");

    workspace.init = function(io){
        io.on("workspace.get", workspace.get);
        io.on("workspace.create", workspace.create);
        io.on("workspace.update", workspace.update);
        io.on("workspace.delete", workspace.delete);
        io.on("workspace.getRootWorkspace", workspace.getRootWorkspace);
    };
    workspace.get = function(id, callback){
        var workspace = repository.workspaces.get(id);
        callback(workspace);
    };
    workspace.update = function(update){
        return repository.workspaces.update(update);
    };
    workspace.delete = function(id){
        return repository.workspaces.delete(id)
    };
    workspace.create = function(workspace){
        return repository.workspaces.insert(workspace);
    };
    workspace.getRootWorkspace = function(noData, callback){
        workspace.get(repository.workspaces.getRootWorkspaceCuid(), callback);
    }
})(module.exports);
