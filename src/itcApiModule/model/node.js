(function(node){
    var guid = require("../../guid");
    var stamp = require("../../itcModule/model/itcStamp");
    var changeEvaluator = require("./../../itcModule/changeEvaluator");

    node.Instance = function(stamp, nodeValue){
        this.stamp = (stamp === undefined) ? {} : stamp;
        this.value = (nodeValue === undefined) ? {} : nodeValue;
        this.id = guid.getNew();
        this.hasConflict = false;
        this.conflictValue1 = {};
        this.conflictValue2 = {};
    };
    node.deserialize = function(nodeJson){
        var nodeStamp = stamp.deserialize(nodeJson.stamp);
        var result = new node.Instance(nodeStamp, nodeJson.value);
        result.hasConflict = nodeJson.hasConflict;
        result.conflictValue1 = nodeJson.conflictValue1;
        result.conflictValue2 = nodeJson.conflictValue2;
        result.id = nodeJson.id;
        return result;
    };
    node.join = function(node1, node2){
        var nodeToReturn;
        switch (changeEvaluator.getWhichChanged(node1.stamp, node2.stamp)) {
            case "neither":
            case "first":
                nodeToReturn = node1;
                break;
            case "second":
                nodeToReturn = node2;
                break;
            case "both":
                nodeToReturn = new node.Instance();
                nodeToReturn.value = -1;
                nodeToReturn.hasConflict = true;
                nodeToReturn.conflictValue1 = node1.value;
                nodeToReturn.conflictValue2 = node2.value;
                break;
        }
        nodeToReturn.stamp = stamp.join(node1.stamp, node2.stamp);

        return nodeToReturn;
    };
})(module.exports);