describe("syncInitializer", function(){
    var should = require("should");
    var sinon = require("sinon");
    var q = require("q");
    var syncInitializer = require("../.././syncInitializer");
    //var syncContext = require("../../src/models/synchronizer/syncContext");
    var target, replica, syncContext, syncResponderProxy;

    beforeEach(function(){
        // Arrange dependencies
        replica = {
            "getChanges" : sinon.spy()
        };
        syncResponderProxy = {
            "respond": sinon.stub()
        };
        syncContext = {
            "replica": replica,
            "syncResponder": syncResponderProxy
        };
        target = new syncInitializer.Instance(syncContext);
    });

    describe("Instance", function(){
        it("should require a context to be passed", function(){
            (function(){
                var target = new syncInitializer.Instance();
            }).should.throw("A sync context must be passed into the syncInitializer Instance");
        });
    });

    describe("begin", function(){
        var gatherChangesStub, gatherChangesDeferred, respondDeferred;

        beforeEach(function(){
            // create deferreds for the promises returned by dependencies of the begin method
            gatherChangesDeferred  = q.defer();
            respondDeferred = q.defer();

            gatherChangesStub = sinon.stub(target, "gatherChanges");
            gatherChangesStub.returns(gatherChangesDeferred.promise);
            syncResponderProxy.respond.returns(respondDeferred.promise)
        });

        it("should call gatherChanges", function(){
            target.begin();
            (target.gatherChanges.calledOnce).should.be.true;
        });

        it("should send the changes to the syncResponder proxy", function(){
            var changes = [];
            var promise = target.begin();

            gatherChangesDeferred.resolve(changes);
            respondDeferred.resolve();

            promise.then(function(){
                (syncContext.syncResponder.respond.calledOnce).should.be.true;
                (syncContext.syncResponder.respond.calledWith(returnValue)).should.be.true;
            })
        });

        afterEach(function(){
            target.gatherChanges.restore();
        })
    });

    describe("gatherChanges", function(){
        it("should request changes from the replica", function(){
            target.gatherChanges();
            (replica.getChanges.calledOnce).should.be.true;
        });
    })
})
