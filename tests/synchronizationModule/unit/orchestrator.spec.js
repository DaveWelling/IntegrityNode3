describe("orchestrator", function(){
    var orchestrator = require("../../../src/model/synchronizer/orchestrator");
    var replica = require("../../../src/model/synchronizer/replica");
    var replicaRepository = require("../../../src/synchronizationModule/repositories/replicaRepository");
    describe("replicaLoad", function(){
        var replicaRepositoryGetStub; // , gatherChangesDeferred, respondDeferred;

        beforeEach(function(){
            // create deferreds for the promises returned by dependencies of the begin method
            //gatherChangesDeferred  = q.defer();
            //gatherChangesStub.returns(gatherChangesDeferred.promise);
            //syncResponderProxy.respond.returns(respondDeferred.promise)

            replicaRepositoryGetStub = sinon.stub(replicaRepository, "get");
            replicaRepositoryGetStub.returns([
                {
                    "id": "",
                    "name": "testReplica",
                    "syncResponderProxyUrl": "./synchronizer/responderProxies/testReplica.js",
                    "syncResponderProxy": null
                }
            ]);
        });

        it("for each replica, it should load the syncResponderProxy", function(){
            orchestrator.replicaLoad();
        });
    });
});
