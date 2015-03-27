// Uses a convention of receiving an emit from the socket
// server as a response to an emit from the client.
// The server will emit to the client request namespace
// plus ".response" or ".error"
(function(socketTraffic){
    var q = require("q");
    var cuid = require("cuid");
    socketTraffic.Init = function(connection){
        var ioConnection = connection;
        this.request = function(namespace, data){
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
        };
        this.respond = function(namespace, responseFunction){
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
    };
})(module.exports);
