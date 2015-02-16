(function(workspace){
    var respository = require("../mongoRepositoriesModule");
    workspace.create = function(workspace){
        return respository.workspaces.insert(workspace);
    }
    workspace.getRootDocument = function(){
        throw new Error("Not implemented.");
    }
})(module.exports);
