describe("changeEvaluator", function () {
    var changeEvaluator = require("../../../src/itcModule/changeEvaluator");
    var itcStamp = require("../../../src/itcModule/model/itcStamp");
    var sinon = require("sinon");
    var chai = require("chai");
    before(function(){
        chai.should();
    });

    describe("getWhichChanged", function () {
        it("given only first has one event, should return 'first'", function () {
            var newStamps = new itcStamp.Instance().fork();
            newStamps[0].createEvent();
            (changeEvaluator.getWhichChanged(newStamps[0], newStamps[1])).should.equal("first");
        });

        it("given neither stamp has an event, should return 'neither'", function () {
            var newStamps = new itcStamp.Instance().fork();
            (changeEvaluator.getWhichChanged(newStamps[0], newStamps[1])).should.equal("neither");
        });

        it("given only second stamp has an event, should return 'second'", function () {
            var newStamps = new itcStamp.Instance().fork();
            newStamps[1].createEvent();
            (changeEvaluator.getWhichChanged(newStamps[0], newStamps[1])).should.equal("second");
        });

        it("given both stamps have an event, should return 'both'", function () {
            var newStamps = new itcStamp.Instance().fork();
            newStamps[0].createEvent();
            newStamps[1].createEvent();
            (changeEvaluator.getWhichChanged(newStamps[0], newStamps[1])).should.equal("both");
        });
    })

});
