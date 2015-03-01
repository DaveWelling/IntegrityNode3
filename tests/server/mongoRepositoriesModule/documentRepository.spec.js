describe("documentRepository Integration", function(){
    var repository = require("../../../src/mongoRepositoriesModule/index").documents;
    var cuid = require('cuid');
    var cleanUpQueue = [];
    var chai = require("chai");
    before(function(){
        chai.should();
    });
    function getTestDocument(){
        var testDoc = {
            id: cuid(),
            title: "A test document"
        };
        cleanUpQueue.push(testDoc);
        return testDoc;
    }
    function getTestDocumentWithTitle(title){
        var testDoc = {
            id: cuid(),
            title: title
        };
        cleanUpQueue.push(testDoc);
        return testDoc;
    }
    afterEach(function(){
        cleanUpQueue.forEach(function(testDoc){
            repository.delete(testDoc.id);
        });
    });

    describe("getByTitle", function(){
        it("should get a document with the given title if one exists", function(done){
            var title = cuid();
            try {
                repository.insert(getTestDocumentWithTitle(title)).then(function (document) {
                    var holdDocument = document;
                    try {
                        repository.getByTitle(title).then(function (foundDocument) {
                            foundDocument.id.should.equal(holdDocument.id);
                            done();
                        });
                    } catch(ex){
                        done(ex);
                    }
                }, done);
            } catch(ex){
                done(ex);
            }
        });
    });
    describe("get", function(){
        it("should get a root document if no id is passed", function(done){
            repository.get().then(function(rootDocument){
                rootDocument.id.should.equal(repository.getRootWorkspaceCuid());
                done();
            }, function(err){
                done(err);
            });
        });

        it("should get a document for a passed id", function(done){
            repository.insert(getTestDocument()).then(
                function(document){
                    var holdDocument = document;
                    repository.get(document.id).then(
                        function(foundDocument){
                            foundDocument.id.should.equal(holdDocument.id);
                            done();
                        }, function(err){
                            done(err);
                        }
                    );
                },
                function (err){
                    done(err);
                }
            );
        });
    });

    describe("Update", function(){
        it("should change the stored value of a document", function(done){
            var newTitle = "Altered test document";
            var testDocument = getTestDocument();
            repository.insert(testDocument)
                .then(function(){
                    testDocument.title = newTitle;
                    return repository.update(testDocument);
                })
                .then(function(){
                    return repository.get(testDocument.id);
                })
                .then(function(resultDocument){
                    resultDocument.id.should.equal(testDocument.id);
                    resultDocument.title.should.equal(newTitle);
                    done();
                }, function(err){
                    done(err);
                });
        });
        it("should add new fields if necessary", function(done){
            var newTitle = "Altered test document";
            var someNewValue= "some new value";
            var testDocument = getTestDocument();
            repository.insert(testDocument)
                .then(function(){
                    testDocument.title = newTitle;
                    testDocument.anotherField = someNewValue;
                    return repository.update(testDocument);
                })
                .then(function(){
                    return repository.get(testDocument.id);
                })
                .then(function(resultDocument){
                    resultDocument.id.should.equal(testDocument.id);
                    resultDocument.title.should.equal(newTitle);
                    resultDocument.anotherField.should.equal(someNewValue);
                    done();
                }, function(err){
                    done(err);
                });
        })
    })

});
