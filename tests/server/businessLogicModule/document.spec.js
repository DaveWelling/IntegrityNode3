describe("document business logic", function(){
    var sinon = require("sinon");
    var chai = require("chai");
    var repositories = require("../../../src/mongoRepositoriesModule");
    var document = require("../../../src/businessLogicModule/document");
    before(function(){
        chai.should();
    });
    describe("create", function(){
        it("should insert a document into the repository", function(){
            var repositoryInsertStub = sinon.stub(repositories.documents, "insert");
            document.create({});
            repositoryInsertStub.calledOnce.should.equal(true);
        });
    });
});
