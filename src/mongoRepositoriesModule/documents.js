(function (documents) {
    var defaultHomeCuid = "ci5bnoavo0001ewmxkb1a92i6";
    var database = require("./database");
    var q = require("q");
    documents.getRootWorkspaceCuid = function(){
        return defaultHomeCuid;
    };


    documents.delete = function(id){
        return database.passToDb(function(deferred, db){
            db.documents.remove({id:id}, function(err, result){
                if (err) {
                    deferred.reject("Delete of document with id " + id + " failed with error: " + err);
                    return;
                }
                deferred.resolve();
            })
        });
    };

    documents.update = function (document){
        return database.passToDb(function(deferred, db){
            db.documents.update({id:document.id}, document, null, function(err){
                if (err){
                    deferred.reject("Update of document id " + document.id + " failed with error: " + err);
                } else{
                    deferred.resolve();
                }
            });
        });
    };

    documents.get = function(id){
        var deferred = q.defer();
        database.getDb(function(err, db){
            if (err){
                deferred.reject("Database initialization failed with error: " + err);
                return;
            }
            if (!id){
                id = defaultHomeCuid;
            }
            db.documents.findOne({ id: id }, function(err, documentFound){
                if (err) {
                    deferred.reject("Find of document with id " + id + " failed with error: " + err);
                    return;
                }
                deferred.resolve(documentFound);
            })
        });
        return deferred.promise;
    };


    documents.getByTitle = function(title){
        var deferred = q.defer();
        database.getDb(function(err, db){
            if (err){
                deferred.reject("Database initialization failed with error: " + err);
                return;
            }
            if (!title){
                deferred.reject("A title must be passed into the getByTitle method");
            }
            db.documents.findOne({ title: title }, function(err, documentFound){
                if (err) {
                    deferred.reject("Find of document with title " + title + " failed with error: " + err);
                    return;
                }
                deferred.resolve(documentFound);
            })
        });
        return deferred.promise;
    };

    documents.insert = function (document){
        var deferred = q.defer();
        database.getDb(function(err, db){
            if (err){
                console.log("Failed to initialize database: " +err);
            } else {
                db.documents.insert(document, function(err) {
                    if (err) {
                        console.log("Failed to insert document into database.");
                        deferred.reject("Failed to insert document into the database. Error:" + err);
                    }
                    else deferred.resolve(document);
                });
            }
        });
        return deferred.promise;
    };

    function seedDatabase(){
        database.getDb(function(err, db){
            if (err){
                console.log("Failed to seed database: " +err);
            } else {
                db.documents.count(function(err, count){
                    if (err){
                        console.log("Failed to retrieve document count.");
                    } else {
                        if (count == 0) {
                            db.documents.insert({
                                id: defaultHomeCuid,
                                title: 'Home'
                            }, function(err) {
                                if (err) console.log("Failed to insert home document into database.");
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
