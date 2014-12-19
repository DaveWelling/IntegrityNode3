(function (controllers) {

    var forkController = require("./../itcApiModule/controllers/forkController");
    var newNodeController = require("./../itcApiModule/controllers/newNodeController");
    var joinController = require("./../itcApiModule/controllers/joinController");
    var eventController = require("./../itcApiModule/controllers/eventController");
    controllers.init = function (app) {
        forkController.init(app);
        newNodeController.init(app);
        joinController.init(app);
        eventController.init(app);
    };

})(module.exports);
