/**
 * Created by david.welling on 10/3/2014.
 */
(function(itcEvent){
    var _ = require('underscore');
    itcEvent.Instance = function Instance(eventValue){
        var that = this;
        this.value = (eventValue === undefined) ? 0 : eventValue;
        this.isLeaf = true;
        this.left = {};
        this.right = {};

        this.lift = function lift(valueToIncreaseBy){
            that.value += valueToIncreaseBy;
        };
        this.drop = function drop(valueToDecreaseBy){
            if (valueToDecreaseBy >= that.value) return;
            that.value -= valueToDecreaseBy;
        };
        this.setAsLeaf = function setAsLeaf(){
            that.isLeaf = true;
            that.left = null;
            that.right = null;
        };
        this.setAsNode = function setAsNode(){
            that.isLeaf = false;
            that.left = new itcEvent.Instance();
            that.right = new itcEvent.Instance();
        };
        this.normalize = function normalize(){
            if (!that.isLeaf
                && that.left.isLeaf
                && that.right.isLeaf
                && that.left.value == that.right.value)
            {
                that.value += that.left.value;
                that.setAsLeaf();
            } else if (!that.isLeaf){
                var minValue = Math.min(that.left.value, that.right.value);
                that.lift(minValue);
                that.left.drop(minValue);
                that.right.drop(minValue);
            }
        };
        function clone(){
            var newClone = new Instance(that.value);
            newClone.isLeaf = that.isLeaf;
            if (!_.isEmpty(that.left)) {
                newClone.left = that.left.clone();
            }

            if (!_.isEmpty(that.right)) {
                newClone.right = that.right.clone();
            }
            return newClone;
        }
        this.clone = clone;
            this.collapseNodeTreeToLeaf = function collapseNodeTreeToLeaf() {
            if (that.isLeaf) return;
            that.left.collapseNodeTreeToLeaf();
            that.right.collapseNodeTreeToLeaf();
            that.value += Math.max(that.left.value, that.right.value);
            that.setAsLeaf();
        };
        this.isEquivalent = function isEquivalent(anotherEvent){
            if (anotherEvent == null){
                return false;
            }
            if (that.isLeaf && anotherEvent.isLeaf && that.value == anotherEvent.value){
                return true;
            }
            return !that.isLeaf && !anotherEvent.isLeaf && that.value == anotherEvent.value
                && that.left.isEquivalent(anotherEvent.left) && that.right.isEquivalent(anotherEvent.right);
        };
        this.leq = function leq(anotherEvent){

            // Target is a node inside here
            if (!that.isLeaf)
            {
                // If target value is greater than param value we are done.
                if (that.value > anotherEvent.value) return false;

                // If they are both Nodes, check which one has the greater
                // child (start with Left first)
                if (!anotherEvent.isLeaf)
                {
                    return cloneAndLiftClone(that.value, that.left)
                            .leq(cloneAndLiftClone(anotherEvent.value, anotherEvent.left))
                        && cloneAndLiftClone(that.value, that.right)
                            .leq(cloneAndLiftClone(anotherEvent.value, anotherEvent.right));
                }

                // If param is not a leaf, compare leaves of target
                // to param leaf
                return cloneAndLiftClone(that.value, that.left).leq(anotherEvent)
                    && cloneAndLiftClone(that.value, that.right).leq(anotherEvent);
            }

            // Target IsLeaf below here

            // Both are leaves, just check value
            if (anotherEvent.isLeaf) return that.value <= anotherEvent.value;

            // Target is leaf and param is node
            if (that.value < anotherEvent.value) return true;

            // Target is leaf, param is node, target value >= param value
            // Convert target to node and recurse
            var tempEvent = clone();
            tempEvent.setAsNode();
            return tempEvent.leq(anotherEvent);
        };
        return this;
    };
    function combineEventValues (event1,event2){
        var newEvent = event1.clone();
        if (!event1.isLeaf && !event2.isLeaf) {// both are nodes
            if (event1.value > event2.value) {
                // force code down "else" path by recursing with
                // switched parameters, then copy the results to event1
                newEvent = itcEvent.join(event2, event1);
            } else {
                var d = event2.value - event1.value;
                event2.left.lift(d);
                event2.right.lift(d);
                newEvent.left = itcEvent.join(event1.left, event2.left);
                newEvent.right = itcEvent.join(event1.right, event2.right);
            }
        } else if (event1.isLeaf && !event2.isLeaf) {
            // If only one event is a node, force both
            // events into Node calculation (above)
            event1.setAsNode();
            newEvent = itcEvent.join(event1, event2);
        } else if (!event1.isLeaf && event2.isLeaf) {
            // If only one event is a node, force both
            // events into Node calculation (above)
            event2.setAsNode();
            newEvent= itcEvent.join(event1, event2);
        } else if (event1.isLeaf && event2.isLeaf) { // both are leafs
            newEvent.value = Math.max(event1.value, event2.value);
        }
        return newEvent;
    }
    itcEvent.join = function join(event1, event2){
        var newEvent = combineEventValues(event1, event2);
        newEvent.normalize();
        return newEvent;
    };
    function cloneAndLiftClone(increaseByValue, eventToClone){
        var newEvent = eventToClone.clone();
        newEvent.value += increaseByValue;
        return newEvent;
    };


    itcEvent.deserialize = function(eventJson){
        var result = new itcEvent.Instance(eventJson.value);
        result.isLeaf = eventJson.isLeaf;
        if (!eventJson.isLeaf) {
            if (eventJson.left) {
                result.left = itcEvent.deserialize(eventJson.left);
            }
            if (eventJson.right) {
                result.right = itcEvent.deserialize(eventJson.right);
            }
        }
        return result;
    };

    itcEvent.cloneAndLiftClone = cloneAndLiftClone;
        /* begin strip out from production */
    itcEvent._testonly_ = {};
    itcEvent._testonly_.combineEventValues = combineEventValues;
    /* end strip out from production */
})(module.exports);