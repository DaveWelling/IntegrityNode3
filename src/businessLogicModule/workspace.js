(function(workspace){
    var repository = require("../mongoRepositoriesModule");
    workspace.init = function(socketTraffic){
        socketTraffic.respond("workspace.get", workspace.get);
        socketTraffic.respond("workspace.create", workspace.create);
        socketTraffic.respond("workspace.update", workspace.update);
        socketTraffic.respond("workspace.remove", workspace.remove);
        socketTraffic.respond("workspace.getRootWorkspace", workspace.getRootWorkspace);
    };
    workspace.get = function(id){
        return repository.workspaces.get(id);
    };
    workspace.update = function(update){
        return repository.workspaces.update(update);
    };
    workspace.remove = function(id){
        return repository.workspaces.remove(id)
    };
    workspace.create = function(workspace){
        return repository.workspaces.insert(workspace);
    };
    workspace.getRootWorkspace = function(){
        return workspace.get(repository.workspaces.getRootWorkspaceCuid());
    }
})(module.exports);
