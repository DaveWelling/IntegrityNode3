describe("workspace", function () {
    var sinon = require("sinon");
    var chai = require("chai");
    var cuid = require("cuid");
    var repositories = require("../../../src/mongoRepositoriesModule");
    var workspace = require("../../../src/businessLogicModule/workspace");
    before(function(){
        chai.should();
    });

    describe("get", function () {
        it("should request a workspace by id from mongo", function(){
            var id = cuid();
            var repositoryGetStub = sinon.stub(repositories.workspaces, "get");
            try {
                var workspaceToReturn = {id: id, name: "test workspace"};
                repositoryGetStub.returns({
                      then: function (success, fail) {
                          success(workspaceToReturn)
                      }
                  });
                workspace.get(id);
            } finally{
                repositoryGetStub.restore();
            }

        });
    });
    describe("create", function () {
        it("should add a new workspace to the repository", function () {
            var repositoryAddStub = sinon.stub(repositories.workspaces, "insert");
            try {
                var workspaceData = {};
                workspace.create(workspaceData);
                repositoryAddStub.withArgs(workspaceData).calledOnce.should.equal(true);
            } finally {
                repositoryAddStub.restore();
            }
        });
    });

    describe("update", function(){
        it("should apply a change to the workspace", function(){
            var repositoryUpdateStub = sinon.stub(repositories.workspaces, "update");
            try {
                var workspaceData = {};
                workspace.update(workspaceData);
                repositoryUpdateStub.withArgs(workspaceData).calledOnce.should.equal(true);
            } finally {
                repositoryUpdateStub.restore();
            }
        })
    });

    // TODO:  Consider switching this to a slowly changing dimension
    describe("remove", function(){
        it("should remove a workspace for the given id", function(){
            var repositoryRemoveStub = sinon.stub(repositories.workspaces, "remove");
            try {
                var id = cuid();
                workspace.remove(id);
                repositoryRemoveStub.withArgs(id).calledOnce.should.equal(true);
            } finally {
                repositoryRemoveStub.restore();
            }
        })
    });

    describe("getRootWorkspace", function(){
        it("should try to acquire the workspace with the root id", function(){
            var rootId = repositories.workspaces.getRootWorkspaceCuid();
            var repositoryGetStub = sinon.stub(repositories.workspaces, "get");
            try {
                workspace.getRootWorkspace();
                repositoryGetStub.withArgs(rootId).calledOnce.should.equal(true);
            } finally{
                repositoryGetStub.restore();
            }
        })
    })

});
