angular.module("commonModule").service('socketTraffic', ["$q", "socketShell", function (q, socketShell) {
    var ioConnection = socketShell;
    function request(namespace, data) {
        var defer = q.defer();
        ioConnection.emit(namespace, data, function(messageId){
            ioConnection.on(namespace + "." + messageId + ".response", function(data){
                defer.resolve(data);
            });
            ioConnection.on(namespace + "." + messageId + ".error", function(error){
                defer.reject(error);
            });
        });
        return defer.promise;
    }
    function respond(namespace, response){
        ioConnection.on(namespace ,function(requestData, callback){
            var messageId = cuid();
            callback(messageId);
            try {
                var responseData = response(requestData);
                ioConnection.emit(namespace + "." + messageId + ".response", responseData)
            } catch (err){
                ioConnection.emit(namespace + "." + messageId + ".error", err)
            }

        });
    }
    return {
        request: request,
        respond: respond
    };
}]);
// A layer of abstraction for testing
angular.module("commonModule").service("socketShell", function(){
    var ioConnection = io.connect();
    ioConnection.on("connect", function(){
        console.log("A connection was established.");
    });
    return ioConnection;
});
