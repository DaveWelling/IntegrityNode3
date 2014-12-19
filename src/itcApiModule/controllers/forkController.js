(function(forkController){
    forkController.init  = function (app) {
        var node = require("../model/node");
        app.post("/api/fork", function (request, response){
            var requestNode =  node.deserialize(request.body);
            var stamps = requestNode.stamp.fork();
            var result = {
                "node1": new node.Instance(stamps[0], requestNode.value),
                "node2": new node.Instance(stamps[1], requestNode.value)
            };
            return response.send(200, result);

        });
    };
})(module.exports);
