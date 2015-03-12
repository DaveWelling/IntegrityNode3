angular.module("commonModule").factory('socketApiFactory', function () {
    GetRootUrl = function () {
        var root = location.hostname;
        return location.protocol + "//" + root + ":59682";
    };
    //return io.connect(GetRootUrl());
    return io.connect();
});
