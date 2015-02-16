
describe("itcId", function() {
    var itcId = require("../../../src/itcModule/model/itcId");
    var sinon = require("sinon");
    var chai = require("chai");
    before(function(){
        chai.should();
    });

    describe("Instance", function(){
        it("should default new instances to value of 1", function(){
            var id = new itcId.Instance();

            (id.value).should.equal(1);
        });
        it("should default isLeaf to true", function() {
            var id = new itcId.Instance();

            (id.isLeaf).should.be.true;
        });
        it("given parameter of 0 should have value of 0", function(){
            var id = new itcId.Instance(0);

            (id.value).should.equal(0);
        });
    });
    describe("sum", function(){
        it("creates a result which is not equal to either input", function(){
            var id1 = new itcId.Instance(0);
            var id2 = new itcId.Instance(1);

            var idResult = itcId.sum(id1, id2);

            (id1).should.not.eql(idResult);
            (id2).should.not.eql(idResult);
        });
        it("creates a result which is a new Id", function(){
            var id1 = new itcId.Instance(0);
            var id2 = new itcId.Instance(1);

            var idResult = itcId.sum(id1, id2);

            (idResult).should.have.property('value');
            (idResult.value).should.be.a.Number;
        });
        it("of two leafs (1 and 0) yields value of 1", function(){
            var id1 = new itcId.Instance(1);
            var id2 = new itcId.Instance(0);

            var idResult = itcId.sum(id1, id2);

            idResult.value.should.equal(1);
        });

        it("of two leafs (0 and 1) yields value of 1", function(){
            var id1 = new itcId.Instance(0);
            var id2 = new itcId.Instance(1);

            var idResult = itcId.sum(id1, id2);

            idResult.value.should.equal(1);
        });
        it("two non-leafs given then left is summed from both ", function(){

            var id1 = new itcId.Instance(0);
            id1.isLeaf = false;
            id1.right = new itcId.Instance(0);
            id1.left = new itcId.Instance(99);
            var id2 = new itcId.Instance(0);
            id2.right = new itcId.Instance(0);
            id2.left = new itcId.Instance(0);
            id2.isLeaf = false;

            var idResult = itcId.sum(id1, id2);

            (idResult.left.value).should.equal(99);
        });
        it("two non-leafs given then right is summed from both ", function(){

            var id1 = new itcId.Instance(0);
            id1.isLeaf = false;
            id1.right = new itcId.Instance(99);
            id1.left = new itcId.Instance(0);
            var id2 = new itcId.Instance(0);
            id2.right = new itcId.Instance(0);
            id2.left = new itcId.Instance(0);
            id2.isLeaf = false;

            var idResult = itcId.sum(id1, id2);

            (idResult.right.value).should.equal(99);
        });
        it("two non-leafs given then result is normalized", function(){

            var id1 = new itcId.Instance(0);
            id1.isLeaf = false;
            id1.right = new itcId.Instance(1);
            id1.left = new itcId.Instance(1);
            var id2 = new itcId.Instance(0);
            id2.right = new itcId.Instance(0);
            id2.left = new itcId.Instance(0);
            id2.isLeaf = false;

            var idResult = itcId.sum(id1, id2);

            (idResult.value).should.equal(1);
            (idResult.isLeaf).should.be.true;
            (idResult.left == null).should.be.true;
            (idResult.right == null).should.be.true;
        });
        it("two leafs with values of 1 should throw an exception", function(){
            var id1 = new itcId.Instance(1);
            var id2 = new itcId.Instance(1);

            (function(){itcId.sum(id1,id2)}).should.throw();
        });
    });
    describe("clone", function(){
        it("copies isLeaf value", function(){
            var id1 = new itcId.Instance(0);
            id1.isLeaf = true;

            var clone = id1.clone();

            (clone.isLeaf).should.be.true;
        });
        it("clones left property of type id", function(){
            var id1 = new itcId.Instance(0);
            id1.isLeaf = true;
            id1.left = new itcId.Instance(999);

            var clone = id1.clone();

            (clone.left.value).should.equal(999);
        });
        it("clones right property of type id", function(){
            var id1 = new itcId.Instance(0);
            id1.isLeaf = true;
            id1.right = new itcId.Instance(777);

            var clone = id1.clone();

            (clone.right.value).should.equal(777);
        });
        it("result should not be same object as instance on which method is called", function(){
            var id1 = new itcId.Instance(0);

            var clone = id1.clone();

            (clone).should.not.equal(id1);
        });
    });
    describe("copy", function(){
        it("receiving Id should have value of passed object", function(){
            var id1 = new itcId.Instance(0);
            var id2 = new itcId.Instance(888);

            id1.copy(id2);

            (id1.value).should.equal(888);
        });
        it("should copy instance of left from passed object", function(){
            var id1 = new itcId.Instance(0);
            var id2 = new itcId.Instance(888);
            id2.left = new itcId.Instance(999);

            id1.copy(id2);

            (id1.left.value).should.equal(999);
        });
        it("should copy instance of right from passed object", function(){
            var id1 = new itcId.Instance(0);
            var id2 = new itcId.Instance(888);
            id2.right = new itcId.Instance(999);

            id1.copy(id2);

            (id1.right.value).should.equal(999);
        });
        it("should isLeaf value from passed object", function(){
            var id1 = new itcId.Instance(0);
            id1.isLeaf = false;
            var id2 = new itcId.Instance(888);
            id2.isLeaf = true;

            id1.copy(id2);

            (id1.isLeaf).should.equal(true);
        });
    });
    describe("normalize", function(){
        it("should do nothing if id isLeaf", function(){
            var id = new itcId.Instance(0);
            id.normalize();
            // no crash == good
        });
        it("given left and right are 0 value leafs it should change the id object to a leaf with 0 value", function(){
            var id = new itcId.Instance(0);
            id.isLeaf = false;
            id.left = new itcId.Instance(0);
            id.right = new itcId.Instance(0);

            id.normalize();

            (id.isLeaf).should.be.true;
            (id.value).should.equal(0);

        });
        it("given left and right are 1 value leafs then it should change the id object to a leaf with value of 1", function(){
            var id = new itcId.Instance(0);
            id.isLeaf = false;
            id.left = new itcId.Instance(1);
            id.right = new itcId.Instance(1);

            id.normalize();

            (id.isLeaf).should.be.true;
            (id.value).should.equal(1);
        })
    });
    describe("setAsLeaf", function(){
        it("should set isLeaf to true", function(){
            var id = new itcId.Instance(0);
            id.isLeaf = false;

            id.setAsLeaf();

            (id.isLeaf).should.be.true;
        });
        it("should set left value to null", function(){
            var id = new itcId.Instance(0);
            id.isLeaf = false;
            id.left = new itcId.Instance(0);

            id.setAsLeaf();

            (id.left == null).should.be.true;
        });
        it("should set right value to null", function(){
            var id = new itcId.Instance(0);
            id.isLeaf = false;
            id.right = new itcId.Instance(0);

            id.setAsLeaf();

            (id.right == null).should.be.true;
        });
    });
    describe("split", function(){
        it("should yield two new objects", function(){
            var id = new itcId.Instance();
            var result = id.split();
            (result[0]).should.not.be.id;
            (result[1]).should.not.be.id;
        });
        it("should yield two new nodes with 0 values.", function(){
            var id = new itcId.Instance();
            var result = id.split();
            (result[0]).should.be.an.instanceof(itcId.Instance);
            (result[1]).should.be.an.instanceof(itcId.Instance);
            (result[0].value).should.equal(0);
            (result[1].value).should.equal(0);
        });
        it("should error if isLeaf and value = 0", function(){
            var id = new itcId.Instance();
            id.value = 0;
            id.isLeaf = true;
            (function(){
                id.split();
            }).should.throw();
        })
        it("should split the id into two nodes with reciprocal 1 and 0 values for left and right", function(){
            var id = new itcId.Instance();
            id.value = 1;
            id.isLeaf = true;
            var results = id.split();
            (results[0].left.value).should.equal(1);
            (results[0].right.value).should.equal(0);
            (results[1].left.value).should.equal(0);
            (results[1].right.value).should.equal(1);
        });
        it("should yield two node ids", function(){
            var id = new itcId.Instance();
            id.value = 1;
            id.isLeaf = true;
            var results = id.split();
            (results[0].isLeaf).should.be.false;
            (results[1].isLeaf).should.be.false;
        });
        it("should recursively split left child if left child is a node with value 1 and right child isLeaf with value 0", function(){
            var id = new itcId.Instance();
            id.setAsNode();
            id.left.value = 1;
            id.right.value = 0;
            var result = id.split();
            (result[0].left.left.value).should.equal(1);
            (result[0].left.right.value).should.equal(0);
            (result[0].right.value).should.equal(0);
            (result[0].right.isLeaf).should.be.true;
            (result[1].left.left.value).should.equal(0);
            (result[1].left.right.value).should.equal(1);
            (result[1].right.value).should.equal(0);
            (result[1].right.isLeaf).should.be.true;
        });
        it("should recursively split right child if right child is a node with value 1 and left child isLeaf with value 0", function(){
            var id = new itcId.Instance();
            id.setAsNode();
            id.left.value = 0;
            id.right.value = 1;
            var result = id.split();
            (result[0].right.left.value).should.equal(1);
            (result[0].right.right.value).should.equal(0);
            (result[0].left.value).should.equal(0);
            (result[0].left.isLeaf).should.be.true;
            (result[1].right.left.value).should.equal(0);
            (result[1].right.right.value).should.equal(1);
            (result[1].left.value).should.equal(0);
            (result[1].left.isLeaf).should.be.true;
        });
        it("should clone both right and left if they are both nodes", function(){
            var id = new itcId.Instance();
            id.setAsNode();
            id.left.setAsNode();
            id.right.setAsNode();
            var leftSpy = sinon.spy(id.left, "clone");
            var rightSpy = sinon.spy(id.right, "clone");
            try {
                var result = id.split();
                (leftSpy.calledOnce).should.be.true;
                (rightSpy.calledOnce).should.be.true;
                (result[0].right.isLeaf).should.be.true;
                (result[1].left.isLeaf).should.be.true;
                (result[0].right.value).should.equal(0);
                (result[1].left.value).should.equal(0);
            } finally {
                id.left.clone.restore();
                id.right.clone.restore();
            }
        });
        it("should throw error if both id children isLeaf = true with value 0", function(){
            var id = new itcId.Instance();
            id.setAsNode();
            id.left = new itcId.Instance(0);
            id.right = new itcId.Instance(0);

            (function(){
                id.split();
            }).should.throw();
        })
    });
    describe("setAsNode", function(){
        it("should set isLeaf to false", function(){
            var id = new itcId.Instance();
            id.setAsNode();
            (id.isLeaf).should.be.false;

        });
        it("should set left to id with value of 1", function() {
            var id = new itcId.Instance();
            id.setAsNode();
            (id.left).should.be.an.instanceof(itcId.Instance);
            (id.left.value).should.equal(1);
        })
        it("should set right to id with value of 0", function() {
            var id = new itcId.Instance();
            id.setAsNode();
            (id.right).should.be.an.instanceof(itcId.Instance);
            (id.right.value).should.equal(0);
        })
        it("should set value to -1", function(){
            var id = new itcId.Instance();
            id.setAsNode();
            (id.value).should.equal(-1);
        })
    });
    describe("deserialize", function(){
        var idJson = {
            "isLeaf":false,
            "value":1,
            "left":{
                "isLeaf":true,
                "value":98,
                "left":null,
                "right":null
            },
            "right":{
                "isLeaf":false,
                "value":99,
                "left":{
                    "isLeaf":true,
                    "value":199,
                    "left":null,
                    "right":null
                },
                "right":null
            }
        };
        it("should return an itcId instance", function(){
            var result = itcId.deserialize(idJson);
            result.should.be.instanceof(itcId.Instance);
        });
        it("should have the value of the Json", function(){
            var result = itcId.deserialize(idJson);
            (result.value).should.equal(1);
        });
        it("should have the isLeaf value of the Json", function(){
            var result = itcId.deserialize(idJson);
            (result.isLeaf).should.equal(idJson.isLeaf);
        });
        it("should have the left leaf value specified in the Json", function(){
            var result = itcId.deserialize(idJson);
            (result.left.value).should.equal(98);
        });
        it("should have the nested left leaf value specified in the right branch of the  Json", function(){
            var result = itcId.deserialize(idJson);
            (result.right.left.value).should.equal(199);
        });
    })
});