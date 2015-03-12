(function (database){
    var mongodb = require("mongodb");
    var q = require("q");
    var mongoUrl = "mongodb://localhost:27017/integrity";
    var db = null;

    database.getDb = function(next){
        if (!db){
            //connect
            mongodb.MongoClient.connect(mongoUrl, function(err, returnedDb) {
                if (err){
                    next(err, null);
                } else {
                    db = {
                        db:returnedDb,
                        workitems:returnedDb.collection("workitems"),
                        workspaces:returnedDb.collection("workspaces")
                    };
                    next(null , db);
                }
            })
        } else {
            next(null, db);
        }
    };



    database.passToDb = function (methodToExecute){
        var deferred = q.defer();
        database.getDb(function(err, db){
            if (err){
                deferred.reject("Database initialization failed with error: " + err);
                return;
            }
            methodToExecute(deferred, db);
        });
        return deferred.promise;
    }


})(module.exports);
