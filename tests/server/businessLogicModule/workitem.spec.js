describe("workitem", function () {
    var sinon = require("sinon");
    var chai = require("chai");
    var cuid = require("cuid");
    var repositories = require("../../../src/mongoRepositoriesModule");
    var workitem = require("../../../src/businessLogicModule/workitem");
    var socketMock;
    before(function(){
        chai.should();

    });
    describe("create", function () {
        it("should add a new workitem to the repository", function () {
            var repositoryAddStub = sinon.stub(repositories.workitems, "insert");
            try {
                var workitemData = {};
                workitem.create(workitemData);
                repositoryAddStub.withArgs(workitemData).calledOnce.should.equal(true);
            } finally {
                repositoryAddStub.restore();
            }
        });
    });

    describe("get", function(){
        it("should acquire a workitem for the given id", function(){
            var repositoryGetStub = sinon.stub(repositories.workitems, "get");
            try {
                var id = cuid();
                workitem.get(id);
                repositoryGetStub.withArgs(id).calledOnce.should.equal(true);
            } finally{
                repositoryGetStub.restore();
            }
        })
    });

    describe("update", function(){
        it("should apply a change to the workitem", function(){
            var repositoryUpdateStub = sinon.stub(repositories.workitems, "update");
            try {
                var workitemData = {};
                workitem.update(workitemData);
                repositoryUpdateStub.withArgs(workitemData).calledOnce.should.equal(true);
            } finally {
                repositoryUpdateStub.restore();
            }
        })
    });

    // TODO:  Consider switching this to a slowly changing dimension
    describe("remove", function(){
        it("should remove a workitem for the given id", function(){
            var repositoryRemoveStub = sinon.stub(repositories.workitems, "remove");
            try {
                var id = cuid();
                workitem.remove(id);
                repositoryRemoveStub.withArgs(id).calledOnce.should.equal(true);
            } finally {
                repositoryRemoveStub.restore();
            }
        })
    });

});
