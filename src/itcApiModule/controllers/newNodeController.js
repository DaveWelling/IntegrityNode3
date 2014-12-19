(function(newNodeController){
    var node = require("../model/node");
    var stamp = require("./itcStamp");
    newNodeController.init = function (app){
        app.get("/api/newNode", function(request, response){
            var newStamp = new stamp.Instance();
            var newNode = new node.Instance(newStamp, 1);
            response.set("Content-Type", "application/json");
            response.send(newNode);
        })
    }
})(module.exports);
