/**
 * Created by david.welling on 10/10/2014.
 */
describe("itcStamp", function() {
    var itcStamp = require("../../src/itcModule/model/itcStamp");
    var itcId = require("../../src/itcModule/model/itcId");
    var should = require("should");
    var sinon = require("sinon");

    describe("ctor", function(){
        it("should have id = 1 if no parameters are passed", function(){
            var stamp = itcStamp.Instance();

            (stamp.itcId.value).should.equal(1);
        });

        it("should have a leaf event if no parameters are passed.", function(){
            var stamp = itcStamp.Instance();

            (stamp.itcEvent.isLeaf).should.equal(true);
        });
    })

    describe("fork", function(){
        it("given a new stamp, should yield an event value of 0 on both returned stamps", function(){
            var newStamps = new itcStamp.Instance().fork();

            (newStamps[0].itcEvent.value).should.equal(0);
            (newStamps[1].itcEvent.value).should.equal(0);
        });

        it("given stamp with event value of 1, should yield new stamps with event values of 1", function(){
            var newStamp = new itcStamp.Instance();
            newStamp.itcEvent.value = 1;
            var newStamps = newStamp.fork();

            (newStamps[0].itcEvent.value).should.equal(1);
            (newStamps[1].itcEvent.value).should.equal(1);
        });

        it("given a new stamp, should yield ID nodes (not leafs)", function(){
            var newStamp = new itcStamp.Instance();
            var newStamps = newStamp.fork();

            (newStamps[0].itcId.isLeaf).should.be.false;
            (newStamps[1].itcId.isLeaf).should.be.false;
        });

        it("given a new stamp, should yield ID nodes (not leafs)", function(){
            var newStamp = new itcStamp.Instance();
            var newStamps = newStamp.fork();

            (newStamps[0].itcId.value).should.equal(0);
            (newStamps[1].itcId.value).should.equal(0);
        });
    });

    describe("join", function(){
        it("given two new stamps, should fail", function(){
            var newStamp0 = new itcStamp.Instance();
            var newStamp1 = new itcStamp.Instance();

            (function(){itcStamp.join(newStamp0, newStamp1);}).should.throw(/^Sum operation on IDs failed/);
        })

        it("should not yield a stamp that is the same as either input", function(){

            var newStamps = new itcStamp.Instance().fork();

            var result = itcStamp.join(newStamps[0], newStamps[1]);

            (result).should.not.equal(newStamps[0]);
            (result).should.not.equal(newStamps[1]);
        });
    })

    describe("deserialize", function () {
        var stampJson = {
            "itcEvent": {
                "left":null,
                "right":null,
                "value":0,
                "isLeaf":true
            },
            "itcId":{
                "isLeaf":true,
                "value":1,
                "left":null,
                "right":null
            }
        };
        it("should create a stamp instance", function(){
            var result = itcStamp.deserialize(stampJson);
            result.should.be.instanceof(itcStamp.Instance);
        });
        it("should rehydrate an itcId in the stamp", function(){
            var result = itcStamp.deserialize(stampJson);
            result.itcId.should.be.instanceof(itcId.Instance);
        })
    })

});