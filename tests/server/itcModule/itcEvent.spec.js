describe("itcEvent", function () {
    var itcEvent = require("../../../src/itcModule/model/itcEvent");
    var sinon = require("sinon");
    var chai = require("chai");
    before(function(){
        chai.should();
    });
    describe("Instance", function () {
        it("should default new instances to value of 0", function () {
            var evt = new itcEvent.Instance();

            (evt.value).should.equal(0);
        });


        it("should default isLeaf to true", function () {
            var evt = new itcEvent.Instance();

            (evt.isLeaf).should.be.true;
        });
    });

    describe("lift", function () {
        it("should increase the value of the itcEvent by the supplied int", function () {
            var evt = new itcEvent.Instance();

            evt.lift(99);

            (evt.value).should.equal(99);
        })
    });

    describe("drop", function () {
        it("should decrease the value of the itcEvent by the supplied int", function () {
            var evt = new itcEvent.Instance(49);

            evt.drop(20);

            (evt.value).should.equal(29);
        });
        it("should ignore supplied int values that are greater than the current itcEvent value", function () {
            var evt = new itcEvent.Instance(49);

            evt.drop(50);

            (evt.value).should.equal(49);
        })
    });

    describe("setAsLeaf", function () {

        it("should change isLeaf to true", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = false;
            evt.setAsLeaf();

            (evt.isLeaf).should.be.true;
        });

        it("should set children to null", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = false;
            evt.left = new itcEvent.Instance(5);
            evt.right = new itcEvent.Instance(5);

            evt.setAsLeaf();

            (evt.left === null).should.be.true;
            (evt.right === null).should.be.true;
        });


    });

    describe("setAsNode", function () {
        it("should set isLeaf to false", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = true;

            evt.setAsNode();

            (evt.isLeaf).should.be.false;
        })
        it("should create new itcEvent objects in left and right properties", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = true;

            evt.setAsNode();

            (evt.left).should.be.an.instanceOf(itcEvent.Instance);
            (evt.right).should.be.an.instanceOf(itcEvent.Instance);
        });
    });

    describe("normalize", function () {
        it("for a node with leaves, it should accumulate the leaf values into the node if they are equal", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = false;
            evt.left = new itcEvent.Instance(5);
            evt.right = new itcEvent.Instance(5);

            evt.normalize();

            (evt.value).should.equal(5);
        })
        it("for a node with leaves of equal values, it should change the node to a leaf", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = false;
            evt.left = new itcEvent.Instance(4);
            evt.right = new itcEvent.Instance(4);

            evt.normalize();

            (evt.isLeaf).should.be.true;
            (evt.value).should.equal(4);
        })
        it("for a node with node children, pull minimum value of children down into parent", function () {
            var evt = new itcEvent.Instance();
            evt.isLeaf = false;
            evt.left = new itcEvent.Instance(4);
            evt.right = new itcEvent.Instance(5);
            evt.normalize();

            (evt.value).should.equal(4);
        })
    });

    describe("clone", function () {
        it("copies isLeaf value", function () {
            var evt = new itcEvent.Instance(0);
            evt.isLeaf = true;

            var clone = evt.clone();

            (clone.isLeaf).should.be.true;
        });

        it("clones left property of type event", function () {
            var evt = new itcEvent.Instance(0);
            evt.isLeaf = true;
            evt.left = new itcEvent.Instance(999);

            var clone = evt.clone();

            (clone.left.value).should.equal(999);
        });


        it("clones right property of type event", function () {
            var evt = new itcEvent.Instance(0);
            evt.isLeaf = true;
            evt.right = new itcEvent.Instance(999);

            var clone = evt.clone();

            (clone.right.value).should.equal(999);
        });

        it("result should not be same object as instance on which method is called", function () {
            var evt = new itcEvent.Instance(0);

            var clone = evt.clone();

            (clone).should.not.equal(evt);
        });
    });

    describe("cloneAndLiftClone", function () {
        it("should create a new itcEvent", function () {
            var eventToClone = new itcEvent.Instance(0);
            var increaseByValue = 9;

            var clone = itcEvent.cloneAndLiftClone(increaseByValue, eventToClone);

            (clone).should.not.equal(eventToClone);
            (clone).should.be.an.instanceOf(itcEvent.Instance);
        });

        it("should create clone with a value increased by the input parameter", function () {
            var eventToClone = new itcEvent.Instance(3);
            var increaseByValue = 9;

            var clone = itcEvent.cloneAndLiftClone(increaseByValue, eventToClone);

            (clone.value).should.equal(12);
        });
    });

    describe("collapseNodeTreeToLeaf", function () {
        // increaseNodeValueByMaxOfDescendants
        it("should set node value to max of left and right values", function () {
            var evt = new itcEvent.Instance(1);
            evt.isLeaf = false;
            evt.right = new itcEvent.Instance(999);
            evt.left = new itcEvent.Instance(50);

            evt.collapseNodeTreeToLeaf();

            (evt.value).should.equal(1000);
        })
        it("should recursively aggregate descendant values with max values", function () {
            var evt = new itcEvent.Instance(1); // <- include this value (1) as well
            evt.isLeaf = false;
            evt.right = new itcEvent.Instance(999);
            evt.right.isLeaf = true;
            evt.left = new itcEvent.Instance(50); // <- pick this one because it's child increases it to 2050
            evt.left.isLeaf = false;
            evt.left.right = new itcEvent.Instance(2000); // <- pick this one
            evt.left.left = new itcEvent.Instance(1);

            evt.collapseNodeTreeToLeaf();

            (evt.value).should.equal(2051);
        })
        it("should set isLeaf to true", function () {
            var evt = new itcEvent.Instance(1); // <- include this value (1) as well
            evt.isLeaf = false;
            evt.right = new itcEvent.Instance(999);
            evt.left = new itcEvent.Instance(50); // <- pick this one because it's child increases it to 2050

            evt.collapseNodeTreeToLeaf();

            (evt.isLeaf).should.be.true;
        });
    })

    describe("join", function () {

        it("result should not be same object as instances on which method is called", function () {
            var evt1 = new itcEvent.Instance(5);
            var evt2 = new itcEvent.Instance(6);

            var result = itcEvent.join(evt1, evt2);

            (result).should.not.equal(evt1);
            (result).should.not.equal(evt2);
        });
    });

    describe("private function combineEventValues", function () {

        it("for two nodes, value difference is added to children of node with smaller value", function () {
            var evt1 = new itcEvent.Instance(5);
            evt1.isLeaf = false;
            evt1.left = new itcEvent.Instance(0);
            evt1.right = new itcEvent.Instance(0);

            var evt2 = new itcEvent.Instance(6);
            evt2.isLeaf = false;
            evt2.left = new itcEvent.Instance(0);
            evt2.right = new itcEvent.Instance(0);

            var result = itcEvent._testonly_.combineEventValues(evt1, evt2);

            (result.left.value).should.equal(1);
        });

        it("for node and leaf, value difference is still added to children of node with smaller value", function () {
            var evt1 = new itcEvent.Instance(4);
            evt1.isLeaf = false;
            evt1.left = new itcEvent.Instance(0);
            evt1.right = new itcEvent.Instance(0);

            var evt2 = new itcEvent.Instance(6);

            //bypass normalize to get a better idea what is going on.
            //  This is necessary because of the recursion of join->combineEventValues->join
            var stub = sinon.stub(itcEvent, "join", itcEvent._testonly_.combineEventValues);
            try {
                var result = itcEvent.join(evt1, evt2);

                (result.left.value).should.equal(2);
            } finally {
                stub.restore();
            }
        });

        it("for two leafs, greater value leaf wins", function () {
            var evt1 = new itcEvent.Instance(4);

            var evt2 = new itcEvent.Instance(99);

            var result = itcEvent.join(evt1, evt2);

            (result.value).should.equal(99);
        });
    });
});


