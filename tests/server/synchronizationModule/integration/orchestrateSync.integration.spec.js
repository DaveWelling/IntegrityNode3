describe("Sync orchestration integration test", function(){
    var orchestrator = require("../../../../src/synchronizationModule/orchestrator");
    var replica = require("../../../../src/synchronizationModule/replica");
    var abstractStorage = require("../../../../src/synchronizationModule/services/storage/abstractStorage.js");
    var replicaArbiter = require("../../../../src/synchronizationModule/replicaArbiter");

    //TODO: Dynamically load replicas, syncResponderProxys, etc.
    // TODO: Find out if dynamic stuff will work in browserfy
    describe("begin", function(){
        var localOrchestrator;
        var localStorage;
        var remoteStorage;
        beforeEach(function(){

            var remotePeer = new TestPeer();
            var remotePeerUrl = remotePeer.url;

            // Create test replica
            var replica = new replica.Instance();
            replica.name = "testReplica";
            replica.peerUrls = [remotePeerUrl];

            // Create two stores with test replica in them
            localStorage = new abstractStorage.Instance("InMemory");
            remoteStorage = new abstractStorage.Instance("MongoDb");
            localStorage.insert(replica);
            remoteStorage.insert(replica);

            // Create orchestrator for use by rest of tests
            localOrchestrator = new orchestrator.Instance();

        });
        describe("given a local change in a replica", function(){
            var newLocalItem;
            beforeEach(function(){
                var localReplicaArbiter = new replicaArbiter.Instance();
                var localReplica = localReplicaArbiter.get("testReplica");
                var localRepository = localReplica.getRepository();
                var newLocalItem = localReplica.createItem();
                newLocalItem.name = guid.getNew();
                newLocalItem.id = newLocalItem.name;
                localRepository.insert(newLocalItem);
            });
            describe("when synchronization is triggered", function(){
                var orchestrationContext;
                beforeEach(function(){
                    // Trigger a synchronization here.
                    orchestrationContext = localOrchestrator.begin();
                });
                it("should write the change to remote replica", function(){
                    orchestrationContext.promise.then(function(result){
                        (result.status).should.equal("success");
                        var repository = new TestRepository(remoteStorage);
                        (repository.get(newLocalItem.id)).should.not.be.null;
                    }, function(error){
                        throw new Error("test failed: " + error);
                    });
                });
            })
        });
    });
});
