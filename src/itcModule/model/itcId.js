/**
 * Created by david.welling on 9/19/2014.
 */
(function(itcId){
    var _ = require('underscore');
    itcId.Instance = function Instance (startValue){
        var that = this;
        this.value = (startValue === undefined) ? 1:  startValue;
        this.isLeaf = true;
        this.left = {};
        this.right = {};
        this.clone = function(){
            var newClone = new Instance(that.value);
            newClone.isLeaf = that.isLeaf;
            if (!_.isEmpty(that.left)) {
                newClone.left = that.left.clone();
            }
            if (!_.isEmpty(that.right)) {
                newClone.right = that.right.clone();
            }
            return newClone;
        };
        this.copy = function(toBeCopied){
            that.value = toBeCopied.value;
            that.left = toBeCopied.left;
            that.right = toBeCopied.right;
            that.isLeaf = toBeCopied.isLeaf;
        };
        this.setAsLeaf = function setAsLeaf (){
            that.isLeaf = true;
            that.left = null;
            that.right = null;
        };
        this.normalize = function(){
            if (!that.isLeaf && that.left.isLeaf && that.right.isLeaf){
                if (that.left.value == 0 && that.right.value == 0){
                    that.setAsLeaf();
                    that.value = 0;
                } else if (that.left.value == 1 && that.right.value == 1){
                    that.setAsLeaf();
                    that.value = 1;
                }
            }
        };
        this.setAsNode = function setAsNode() {
            that.isLeaf = false;
            that.value = -1;
            that.left = new itcId.Instance();
            that.right = new itcId.Instance(0);
        };
        this.split = function split(){
            var result = [
                new itcId.Instance(0),
                new itcId.Instance(0)
            ];
            result[0].setAsNode();
            result[0].value = 0;
            result[1].setAsNode();
            result[1].value = 0;
            if (that.isLeaf){
                if (that.value == 1){
                    result[0].left = new itcId.Instance(1);
                    result[0].right = new itcId.Instance(0);
                    result[1].left = new itcId.Instance(0);
                    result[1].right = new itcId.Instance(1);
                } else {
                    throw new Error("ID value should equal 1 if the node is a leaf");
                }
            } else {
                if ((!that.left.isLeaf || that.left.value == 1) && (that.right.isLeaf && that.right.value == 0) ){
                    var leftSplit = that.left.split();
                    result[0].left = leftSplit[0];
                    result[1].left = leftSplit[1];
                    result[0].right = new itcId.Instance(0);
                    result[1].right = new itcId.Instance(0);
                } else if ((!that.right.isLeaf || that.right.value == 1) && (that.left.isLeaf && that.left.value == 0)) {
                    var rightSplit = that.right.split();
                    result[0].right = rightSplit[0];
                    result[1].right = rightSplit[1];
                    result[0].left = new itcId.Instance(0);
                    result[1].left = new itcId.Instance(0);
                } else if ((!that.right.isLeaf || that.right.value == 1) && (!that.left.isLeaf || that.left.value == 1)){
                    result[0].left = that.left.clone();
                    result[1].right = that.right.clone();
                    result[0].right = new itcId.Instance(0);
                    result[1].left = new itcId.Instance(0);
                } else {
                    throw new Error ("Invalid data in id for split method");
                }
            }
            return result;
        };
        return this;
    };

    itcId.sum = function sum (id0, id1){
        var newId = {};
        if (id0.isLeaf && id0.value == 0){
            newId = new itcId.Instance(0);
            newId.copy(id1);
        } else if (id1.isLeaf && id1.value == 0) {
            newId = id0.clone()
        } else if (!id0.isLeaf && !id1.isLeaf){
            newId = id0.clone();
            newId.left = sum(id0.left, id1.left);
            newId.right = sum(id0.right, id1.right);
            newId.normalize();
        } else {
            throw new Error("Sum operation on IDs failed.  " +
                "First Id's value: " + id0.value +
                ".  Second Id's value: " + id1.value);
        }
        return newId;
    };
    itcId.deserialize = function(idJson){
        var result = new itcId.Instance(idJson.value);
        result.isLeaf = idJson.isLeaf;
        if (!idJson.isLeaf) {
            if (idJson.left) {
                result.left = itcId.deserialize(idJson.left);
            }
            if (idJson.right) {
                result.right = itcId.deserialize(idJson.right);
            }
        }
        return result;
    }
})(module.exports);