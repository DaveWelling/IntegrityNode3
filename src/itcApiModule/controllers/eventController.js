
(function(eventController){
    eventController.init  = function (app) {
        var node = require("../model/node");
        app.post("/api/nodeEvent", function (request, response){
            var result =  node.deserialize(request.body);
            result.stamp.createEvent();
            result.value += 1;
            return response.send(200, result);

        });
    };
})(module.exports);
