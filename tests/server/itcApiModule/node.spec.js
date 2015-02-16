describe("itcApiModule", function(){
    describe("node", function(){
        var node = require("../../../src/itcApiModule/node");
        var chai = require("chai");
        before(function(){
            chai.should();
        });
        describe("deserialize", function(){
            var nodeJson = {
                "stamp":{
                    "itcEvent": {
                        "left":null,
                        "right":null,
                        "value":7,
                        "isLeaf":true
                    },
                    "itcId":{
                        "isLeaf":true,
                        "value":1,
                        "left":null,
                        "right":null
                    }
                },
                "value":'test value',
                "id":"da4b211d-617b-4761-98c7-eab0829bd0da",
                "hasConflict":false,
                "conflictValue1":0,
                "conflictValue2":0
            };
            it("should create a node", function(){
                var result = node.deserialize(nodeJson);
                (result).should.be.instanceOf(node.Instance);
            });
            it("should populate the node with a stamp containing the same id value", function(){
                var result = node.deserialize(nodeJson);
                (result.stamp.itcId.value).should.equal(1);
            });
            it("should populate the node with the node value from the JSON", function(){
                var result = node.deserialize(nodeJson);
                (result.value).should.equal('test value');
            });
            it("should populate the node with the node ID from the JSON", function(){
                var result = node.deserialize(nodeJson);
                (result.id).should.equal('da4b211d-617b-4761-98c7-eab0829bd0da');
            });
            it("should populate the node with the node hasConflict from the JSON", function(){
                var result = node.deserialize(nodeJson);
                (result.hasConflict).should.not.equal(undefined);
                (result.hasConflict).should.be.false;
            });
            it("should populate the node with the node conflictValue1 from the JSON", function(){
                var result = node.deserialize(nodeJson);
                (result.conflictValue1).should.equal(0);
            });
            it("should populate the node with the node conflictValue2 from the JSON", function(){
                var result = node.deserialize(nodeJson);
                (result.conflictValue2).should.equal(0);
            });
            it("should populate the node with a stamp containing the same event", function(){
                var result = node.deserialize(nodeJson);
                (result.stamp.itcEvent.value).should.equal(7);
            });
        })
    });
});
