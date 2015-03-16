describe("workitemRepository Integration", function(){
    var repository = require("../../../src/mongoRepositoriesModule/index").workitems;
    var cuid = require('cuid');
    var cleanUpQueue = [];
    var chai = require("chai");
    before(function(){
        chai.should();
    });
    function getTestWorkitem(){
        var testWorkitem = {
            id: cuid(),
            title: "A test workitem"
        };
        cleanUpQueue.push(testWorkitem);
        return testWorkitem;
    }
    function getTestWorkitemWithTitle(title){
        var testWorkitem = {
            id: cuid(),
            title: title
        };
        cleanUpQueue.push(testWorkitem);
        return testWorkitem;
    }
    afterEach(function(){
        cleanUpQueue.forEach(function(testWorkitem){
            repository.remove(testWorkitem.id);
        });
    });

    describe("getByTitle", function(){
        it("should get a workitem with the given title if one exists", function(done){
            var title = cuid();
            try {
                repository.insert(getTestWorkitemWithTitle(title)).then(function (workitem) {
                    var holdWorkitem = workitem;
                    try {
                        repository.getByTitle(title).then(function (foundWorkitem) {
                            foundWorkitem.id.should.equal(holdWorkitem.id);
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

        it("should get a workitem for a passed id", function(done){
            repository.insert(getTestWorkitem()).then(
                function(workitem){
                    var holdWorkitem = workitem;
                    repository.get(workitem.id).then(
                        function(foundWorkitem){
                            foundWorkitem.id.should.equal(holdWorkitem.id);
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
        it("should throw an error if an id is not passed", function(){
            repository.get(null).then(
                function(foundWorkitem){
                }, function(err){
                    return expect(err.message).to.eventually.be("An id is required for a get operation.");
                }
            );
        });
    });

    describe("Update", function(){
        it("should change the stored value of a workitem", function(done){
            var newTitle = "Altered test workitem";
            var testWorkitem = getTestWorkitem();
            repository.insert(testWorkitem)
                .then(function(){
                    testWorkitem.title = newTitle;
                    return repository.update(testWorkitem);
                })
                .then(function(){
                    return repository.get(testWorkitem.id);
                })
                .then(function(resultWorkitem){
                    resultWorkitem.id.should.equal(testWorkitem.id);
                    resultWorkitem.title.should.equal(newTitle);
                    done();
                }, function(err){
                    done(err);
                });
        });
        it("should add new fields if necessary", function(done){
            var newTitle = "Altered test workitem";
            var someNewValue= "some new value";
            var testWorkitem = getTestWorkitem();
            repository.insert(testWorkitem)
                .then(function(){
                    testWorkitem.title = newTitle;
                    testWorkitem.anotherField = someNewValue;
                    return repository.update(testWorkitem);
                })
                .then(function(){
                    return repository.get(testWorkitem.id);
                })
                .then(function(resultWorkitem){
                    resultWorkitem.id.should.equal(testWorkitem.id);
                    resultWorkitem.title.should.equal(newTitle);
                    resultWorkitem.anotherField.should.equal(someNewValue);
                    done();
                }, function(err){
                    done(err);
                });
        })
    })

});
