describe("workitem", function () {
    var sinon = require("sinon");
    var chai = require("chai");
    var cuid = require("cuid");
    var repositories = require("../../../src/mongoRepositoriesModule");
    var workitem = require("../../../src/businessLogicModule/workitem");
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
        workitem.init(socketMock);

    });
    describe("create", function () {
        it("should add a new workitem to the repository", function () {
            var repositoryAddStub = sinon.stub(repositories.workitems, "insert");
            try {
                var workitemData = {};
                socketMock.emit("workitem.create", workitemData);
                repositoryAddStub.withArgs(workitemData).calledOnce.should.equal(true);
            } finally {
                repositoryAddStub.restore();
            }
        });
    });

    describe("get", function(){
        it("should acquire a workitem for the given id", function(){
            var fakeworkitem = {};
            var repositoryGetStub = sinon.stub(repositories.workitems, "get").returns(fakeworkitem);
            try {
                var id = cuid();
                socketMock.emit("workitem.get", id, function(workitem){
                    workitem.should.be.equal(fakeworkitem);
                });
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
                socketMock.emit("workitem.update", workitemData);
                repositoryUpdateStub.withArgs(workitemData).calledOnce.should.equal(true);
            } finally {
                repositoryUpdateStub.restore();
            }
        })
    });

    // TODO:  Consider switching this to a slowly changing dimension
    describe("delete", function(){
        it("should delete a workitem for the given id", function(){
            var repositoryDeleteStub = sinon.stub(repositories.workitems, "delete");
            try {
                var id = cuid();
                socketMock.emit("workitem.delete", id);
                repositoryDeleteStub.withArgs(id).calledOnce.should.equal(true);
            } finally {
                repositoryDeleteStub.restore();
            }
        })
    });

});
