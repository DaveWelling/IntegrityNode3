
describe("workspaceRepository Integration", function(){
    var repository = require("../../../src/mongoRepositoriesModule/index").workspaces;
    var cuid = require('cuid');
    var cleanUpQueue = [];
    var chai = require("chai");
    before(function(){
        chai.should();
    });
    function getTestWorkspace(){
        var testWorkspace = {
            id: cuid(),
            title: "A test workspace"
        };
        cleanUpQueue.push(testWorkspace);
        return testWorkspace;
    }
    afterEach(function(){
        cleanUpQueue.forEach(function(testWorkspace){
            repository.delete(testWorkspace.id);
        });
    });
    describe("get", function(){
        it("should get a root workspace if no id is passed", function(done){
            repository.get().then(function(rootWorkspace){
                rootWorkspace.id.should.equal(repository.getRootWorkspaceCuid());
                done();
            }, function(err){
                done(err);
            });
        });

        it("should get a workspace for a passed id", function(done){
            repository.insert(getTestWorkspace()).then(
                function(workspace){
                    var holdWorkspace = workspace;
                    repository.get(workspace.id).then(
                        function(foundWorkspace){
                            foundWorkspace.id.should.equal(holdWorkspace.id);
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
        it("should change the stored value of a workspace", function(done){
            var newTitle = "Altered test workspace";
            var testWorkspace = getTestWorkspace();
            repository.insert(testWorkspace)
                .then(function(){
                    testWorkspace.title = newTitle;
                    return repository.update(testWorkspace);
                })
                .then(function(){
                    return repository.get(testWorkspace.id);
                })
                .then(function(resultWorkspace){
                    resultWorkspace.id.should.equal(testWorkspace.id);
                    resultWorkspace.title.should.equal(newTitle);
                    done();
                }, function(err){
                    done(err);
                });
        });
        it("should add new fields if necessary", function(done){
            var newTitle = "Altered test document";
            var someNewValue= "some new value";
            var testWorkspace = getTestWorkspace();
            repository.insert(testWorkspace)
                .then(function(){
                    testWorkspace.title = newTitle;
                    testWorkspace.anotherField = someNewValue;
                    return repository.update(testWorkspace);
                })
                .then(function(){
                    return repository.get(testWorkspace.id);
                })
                .then(function(resultWorkspace){
                    resultWorkspace.id.should.equal(testWorkspace.id);
                    resultWorkspace.title.should.equal(newTitle);
                    resultWorkspace.anotherField.should.equal(someNewValue);
                    done();
                }, function(err){
                    done(err);
                });
        })
    })

});
