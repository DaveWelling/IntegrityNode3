(function(document){
    var respository = require("../mongoRepositoriesModule");
    document.create = function(documentToCreate){
            return respository.documents.insert(documentToCreate);
    }
})(module.exports);
