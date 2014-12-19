(function(itcStamp) {
    var itcEvent = require("./itcEvent");
    var itcId = require("./itcId");

    itcStamp.Instance = function(id, event){
        var that = this;
        this.itcEvent = (event === undefined) ? new itcEvent.Instance(): event;
        this.itcId = (id === undefined) ? new itcId.Instance(): id;

        this.createEvent = function createEvent(){
            var holdEventState = that.itcEvent.clone();
            fill(that.itcId, that.itcEvent);
            var notFilled = holdEventState.isEquivalent(that.itcEvent);

            if (notFilled) {
                grow(that.itcId, that.itcEvent);
            }
        };

        this.leq = function leq(anotherStamp){
            return that.itcEvent.leq(anotherStamp.itcEvent);
        };

        this.fork = function fork(){
            var newIds = that.itcId.split();
            var newStamp0 = new itcStamp.Instance(newIds[0], that.itcEvent.clone());
            var newStamp1 = new itcStamp.Instance(newIds[1], that.itcEvent.clone());
            return [newStamp0, newStamp1];
        };

        return this;
    };

    function deserialize(stampJson) {
        var id = itcId.deserialize(stampJson.itcId);
        var event = itcEvent.deserialize(stampJson.itcEvent);
        var result = new itcStamp.Instance(id, event);
        return result;
    }
    function fill(id, event){
        if (id.isLeaf && id.value == 1){
            event.collapseNodeTreeToLeaf();
        } else if(event.isLeaf || (id.isLeaf && id.value == 0)) {
            // do nothing
        } else if (!id.isLeaf){
            if (id.left.isLeaf && id.left.value == 1) {
                fill(id.right, event.right);
                event.left.collapseNodeTreeToLeaf();
                event.left.value = Math.max(event.left.value, event.right.value);
                event.normalize();
            } else if (id.right.isLeaf && id.right.value == 1){
                fill(id.left, event.left);
                event.right.collapseNodeTreeToLeaf();
                event.right.value = Math.max(event.right.value, event.left.value);
                event.normalize();
            } else {
                fill(id.left, event.left);
                fill(id.right, event.right);
                event.normalize();
            }
        } else {
            throw new Error("Problem with the fill method \n ID:" + id + "\n Ev:" + event);
        }
    }

    function grow(id, event) {
        var cost;

        if (event.isLeaf)
        {
            if (id.isLeaf && id.value == 1)
            {
                event.value++;
                return 0;
            }

            event.setAsNode();
            cost = grow(id, event);
            return cost + 1000;
        }

        if (!id.isLeaf)
        {
            if (id.left.isLeaf && id.left.value == 0)
            {
                cost = grow(id.right, event.right);
                return cost + 1;
            }
            if (id.right.isLeaf && id.right.value == 0)
            {
                cost = grow(id.left, event.left);
                return cost + 1;
            }
        }
        else  // i.IsLeaf
        {
            throw new Error("Error in the grow operation \n ID:" + id + "\n Event:" + event);
        }

        var costRight = grow(id.right, event.right);
        var costLeft = grow(id.left, event.left);
        if (costLeft < costRight)
        {
            event.right = event.right.clone();
            return costLeft + 1;
        }
        event.left = event.left.clone();
        return costRight + 1;
    }

    function join(stamp1, stamp2) {
        return new itcStamp.Instance(
            itcId.sum(stamp1.itcId, stamp2.itcId),
            itcEvent.join(stamp1.itcEvent, stamp2.itcEvent)
        );
    }

    itcStamp.grow = grow;
    itcStamp.fill = fill;
    itcStamp.join = join;
    itcStamp.deserialize = deserialize;

})(module.exports);