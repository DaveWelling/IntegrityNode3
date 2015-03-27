angular.module("commonModule").service('socketTraffic', ["$q", "socketShell", function ($q, socketShell) {
    var ioConnection = socketShell;
    function request(namespace, outgoingData) {
        var defer = $q.defer();
        ioConnection.emit(namespace, outgoingData, function(messageId){
            ioConnection.on(namespace + "." + messageId + ".response", function(result){
                defer.resolve(result);
            });
            ioConnection.on(namespace + "." + messageId + ".error", function(error){
                defer.reject(error);
            });
        });
        return defer.promise;
    }
    function respond(namespace, responseFunction){
        ioConnection.on(namespace ,function(requestData, callback){
            var messageId = cuid();
            callback(messageId);
			try {
				var responsePromise = responseFunction(requestData);
				if (!responsePromise || !responsePromise.then){
					throw Error("A promise must be returned by the responseFunction parameter")
				}
				responsePromise.then(function(responseData){
					ioConnection.emit(namespace + "." + messageId + ".response", responseData)
				}, function(err){
					ioConnection.emit(namespace + "." + messageId + ".error", err)
				});
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
