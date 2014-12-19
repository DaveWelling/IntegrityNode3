(function(changeEvaluator) {
    changeEvaluator.getWhichChanged = function getWhichChanged (firstStamp, secondStamp){

        var firstLeqSecond = firstStamp.leq(secondStamp);
        var secondLeqFirst = secondStamp.leq(firstStamp);

        if (secondLeqFirst && firstLeqSecond){ return "neither"; }

        if (firstLeqSecond) {return "second";}

        if (secondLeqFirst) {return "first";}

        return "both";
    };
})(module.exports);