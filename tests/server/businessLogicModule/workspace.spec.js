describe("workspace", function () {
    var sinon = require("sinon");
    var chai = require("chai");
    var repositories = require("../../../src/mongoRepositoriesModule");
    var workspace = require("../../../src/businessLogicModule/workspace");
    before(function(){
        chai.should();
    });
    describe("create", function () {
        it("should add a new workspace to the repository", function () {
            var repositoryAddStub = sinon.stub(repositories.workspaces, "insert");
            workspace.create({});
            repositoryAddStub.calledOnce.should.equal(true);
        });
    });

    describe("getRootDocument", function(){

    })
});
