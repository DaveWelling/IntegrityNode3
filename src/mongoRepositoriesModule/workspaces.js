(function (workspaces) {

    var defaultHomeCuid = "ci5cs8jnf00047wmxojtae5mm";
    var database = require("./database");
    var q = require("q");
    workspaces.getRootWorkspaceCuid = function(){
        return defaultHomeCuid;
    };

    workspaces.insert = function(workspace){
        return database.passToDb(function(deferred, db){
            db.workspaces.insert(workspace, function(err) {
                if (err) {
                    console.log("Failed to insert workspace into database.");
                    deferred.reject("Failed to insert workspace into the database. Error:" + err);
                }
                else deferred.resolve(workspace);
            });
        });
    };

    workspaces.update = function(workspace){
        return database.passToDb(function(deferred, db){
            db.workspaces.update({id:workspace.id}, workspace, null, function(err){
                if (err){
                    deferred.reject("Update of workspace id " + workspace.id + " failed with error: " + err);
                } else{
                    deferred.resolve();
                }
            });
        });
    };

    workspaces.remove = function(id){
        return database.passToDb(function(deferred, db){
            db.workspaces.remove({id:id}, function(err, result){
                if (err) {
                    deferred.reject("Remove of workspace with id " + id + " failed with error: " + err);
                    return;
                }
                deferred.resolve();
            })
        });
    };

    workspaces.get = function(id){
        if (!id){
            id = defaultHomeCuid;
        }
        return database.passToDb(function(deferred, db){
            db.workspaces.findOne({"id": id }, function (err, workspaceFound){
                if (err){
                    deferred.reject("Find of workspace with id " + id + " failed with error: " + err);
                    return;
                }
                deferred.resolve(workspaceFound);
            });
        });
    };

    function seedDatabase(){
        database.getDb(function(err, db){
            if (err){
                console.log("Failed to seed database: " +err);
            } else {
                db.workspaces.count(function(err, count){
                    if (err){
                        console.log("Failed to retrieve workspaces count.");
                    } else {
                        if (count == 0) {
                            db.workspaces.insert({
                                id: defaultHomeCuid,
                                title: 'Home'
                            }, function(err) {
                                if (err) console.log("Failed to insert home workspace into database.");
                            });
                        } else {
                            console.log("Database already seeded.");
                        }
                    }
                });
            }
        });
    }

    seedDatabase();

})(module.exports);

