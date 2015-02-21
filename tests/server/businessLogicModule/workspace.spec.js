describe("workspace", function () {
    var sinon = require("sinon");
    var chai = require("chai");
    var cuid = require("cuid");
    var repositories = require("../../../src/mongoRepositoriesModule");
    var workspace = require("../../../src/businessLogicModule/workspace");
    var socketMock;
    before(function(){
        chai.should();
        socketMock =(function(){
            var mock = {};
            var subscribers = [];
            mock.emit = function(messageName, dataPassedIn, callback){
                for(i=0;i<subscribers.length;i++){
                    if(subscribers[i].messageName == messageName){
                        subscribers[i].eventHandler(dataPassedIn, callback);
                    }
                }
            };
            mock.on = function(messageName, eventHandler){
                subscribers.push({"messageName": messageName, "eventHandler": eventHandler});
            };

            return mock;
        })();
        workspace.init(socketMock);

    });
    describe("create", function () {
        it("should add a new workspace to the repository", function () {
            var repositoryAddStub = sinon.stub(repositories.workspaces, "insert");
            try {
                var workspaceData = {};
                socketMock.emit("workspace.create", workspaceData);
                repositoryAddStub.withArgs(workspaceData).calledOnce.should.equal(true);
            } finally {
                repositoryAddStub.restore();
            }
        });
    });

    describe("get", function(){
        it("should acquire a workspace for the given id", function(){
            var fakeWorkspace = {};
            var repositoryGetStub = sinon.stub(repositories.workspaces, "get").returns(fakeWorkspace);
            try {
                var id = cuid();
                socketMock.emit("workspace.get", id, function(workspace){
                    workspace.should.be.equal(fakeWorkspace);
                });
                repositoryGetStub.withArgs(id).calledOnce.should.equal(true);
            } finally{
                repositoryGetStub.restore();
            }
        })
    });

    describe("update", function(){
        it("should apply a change to the workspace", function(){
            var repositoryUpdateStub = sinon.stub(repositories.workspaces, "update");
            try {
                var workspaceData = {};
                socketMock.emit("workspace.update", workspaceData);
                repositoryUpdateStub.withArgs(workspaceData).calledOnce.should.equal(true);
            } finally {
                repositoryUpdateStub.restore();
            }
        })
    });

    // TODO:  Consider switching this to a slowly changing dimension
    describe("delete", function(){
        it("should delete a workspace for the given id", function(){
            var repositoryDeleteStub = sinon.stub(repositories.workspaces, "delete");
            try {
                var id = cuid();
                socketMock.emit("workspace.delete", id);
                repositoryDeleteStub.withArgs(id).calledOnce.should.equal(true);
            } finally {
                repositoryDeleteStub.restore();
            }
        })
    });

    describe("getRootDocument", function(){
        it("should try to acquire the workspace with the root id", function(){
            var rootId = repositories.workspaces.getRootWorkspaceCuid();
            var fakeWorkspace = {};
            var repositoryGetStub = sinon.stub(repositories.workspaces, "get").returns(fakeWorkspace);
            try {
                socketMock.emit("workspace.getRootWorkspace", null, function(workspace){
                    workspace.should.be.equal(fakeWorkspace);
                });
                repositoryGetStub.withArgs(rootId).calledOnce.should.equal(true);
            } finally{
                repositoryGetStub.restore();
            }
        })
    })
});
