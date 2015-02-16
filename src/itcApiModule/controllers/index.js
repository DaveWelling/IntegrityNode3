(function (controllers) {

    var forkController = require("./forkController");
    var newNodeController = require("./newNodeController");
    var joinController = require("./joinController");
    var eventController = require("./eventController");
    controllers.init = function (app) {
        forkController.init(app);
        newNodeController.init(app);
        joinController.init(app);
        eventController.init(app);
    };

})(module.exports);
