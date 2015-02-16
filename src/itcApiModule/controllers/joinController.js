(function(joinController){
    joinController.init  = function (app) {
        var node = require("../node");
        app.post("/api/join", function (request, response){
            var node1 =  node.deserialize(request.body.node1);
            var node2 =  node.deserialize(request.body.node2);
            var result = node.join(node1, node2);
            return response.send(200, result);
        });
    };
})(module.exports);

