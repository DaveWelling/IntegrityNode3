
describe("socketTraffic", function () {
    describe("request", function () {

        function getRemoteEmitNamespace(uniqueNamespace, socketMock, callSequence) {
            // Most of the time you just want the namespace for the first request
            // to the server.
            if (!callSequence) {
                callSequence = 0;
            } else {
                callSequence--;
            }
            var messageId = cuid();
            // Get the callback function passed to the server
            var emitFunction = socketMock.emit.args[callSequence][2];
            // Use it to set the messageId
            emitFunction(messageId);
            // This is the response emit namespace minus the suffix ("response" or "error")
            return uniqueNamespace + "." + messageId;
        }
        beforeEach(function(){
            var that = this;
            module("commonModule", function($provide){
                that.socketMock = (function(){
                    var mock = {};
                    var subscribers = [];
                    mock.raiseEvent = function(messageName, dataPassedIn, callback){
                        for(i=0;i<subscribers.length;i++){
                            if(subscribers[i].messageName == messageName){
                                subscribers[i].eventHandler(dataPassedIn, callback);
                            }
                        }
                    };
                    mock.emit = sinon.spy();
                    mock.on = function(messageName, eventHandler){
                        subscribers.push({"messageName": messageName, "eventHandler": eventHandler});
                    };

                    return mock;
                })();
                $provide.value('socketShell', that.socketMock);
            });
            inject(function(socketTraffic, $rootScope){
                that.target = socketTraffic;
                that.rootScope = $rootScope;
            })
        });
        it("should give a promise response for a request", function(){
            var promise = this.target.request("", {});
            expect(promise.then).toBeDefined();
        });
        it("should emit to the remote socket using the input namespace", function(){
            var uniqueNamespace = cuid();
            this.target.request(uniqueNamespace, {});
            // Get emit namespace back from spy (contains a message id)
            var emitNamespaceReceivedByRemoteSocket = this.socketMock.emit.args[0][0];
            return expect(emitNamespaceReceivedByRemoteSocket).toBe(uniqueNamespace);
        });
        it("should return a value emitted by the remote socket", function(done){
            var uniqueNamespace = cuid();
            var uniqueDataToReturn = cuid();
            this.target.request(uniqueNamespace, {}).then(function(data){
                expect(data).toBe(uniqueDataToReturn);
                done();
            });
            // Get emit namespace back from spy (contains a message id)
            var emitNamespace1 = getRemoteEmitNamespace(uniqueNamespace, this.socketMock);
            this.socketMock.raiseEvent(emitNamespace1 + ".response", uniqueDataToReturn);
            // This is needed with Angular promises (i.e. $q usage) to trigger the "then"
            this.rootScope.$apply()
        });
        it("should return an error if the remote socket throws one", function(done){
            var uniqueNamespace = cuid();
            var uniqueErrorToReturn = cuid();
            this.target.request(uniqueNamespace, {}).then(null, function(error){
                expect(error).toBe(uniqueErrorToReturn);
                done();
            });
            // Get emit namespace back from spy (contains a message id)
            var emitNamespace1 = getRemoteEmitNamespace(uniqueNamespace, this.socketMock);
            this.socketMock.raiseEvent(emitNamespace1 + ".error", uniqueErrorToReturn);
            // This is needed with Angular promises (i.e. $q usage) to trigger the "then"
            this.rootScope.$apply()
        });
        it("should not receive a response from another simultaneous request with the same namespace", function(done){
            var uniqueNamespace = cuid();
            var uniqueDataToReturnForFirstCall = cuid();
            var uniqueDataToReturnForSecondCall = cuid();
            var calls = 0;
            // send request and expect specific data to be returned
            this.target.request(uniqueNamespace, {}).then(function(data){
                try {
                    expect(data).toBe(uniqueDataToReturnForFirstCall);
                    expect(data).not.toBe(uniqueDataToReturnForSecondCall);
                    calls++;
                    if (calls === 2) { // Check both calls
                        done();
                    }
                } catch(ex){
                    done(ex);
                }
            });
            // send request and expect specific data to be returned
            this.target.request(uniqueNamespace, {}).then(function(data){
                try {
                    expect(data).toBe(uniqueDataToReturnForSecondCall);
                    expect(data).not.toBe(uniqueDataToReturnForFirstCall);
                    calls++;
                    if (calls === 2) {  // Check both calls
                        done();
                    }
                } catch(ex){
                    done(ex);
                }
            });
            // Get emit namespace back from spy (contains a message id)
            var emitNamespace1 = getRemoteEmitNamespace(uniqueNamespace, this.socketMock);// first call above
            var emitNamespace2 = getRemoteEmitNamespace(uniqueNamespace, this.socketMock, 2); // second call above

            // Match call to data expected back.
            this.socketMock.raiseEvent(emitNamespace1 + ".response", uniqueDataToReturnForFirstCall);
            this.socketMock.raiseEvent(emitNamespace2 + ".response", uniqueDataToReturnForSecondCall);
            // This is needed with Angular promises (i.e. $q usage) to trigger the "then"
            this.rootScope.$apply()
        });
    });
    describe("respond", function () {
        beforeEach( function() {
            var that = this;
            module("commonModule", function($provide){
                that.socketMock = (function(){
                    var mock = {};
                    var subscribers = [];
                    mock.raiseEvent = function(messageName, dataPassedIn, callback){
                        for(i=0;i<subscribers.length;i++){
                            if(subscribers[i].messageName == messageName){
                                subscribers[i].eventHandler(dataPassedIn, callback);
                            }
                        }
                    };
                    mock.emit = sinon.spy();
                    mock.on = function(messageName, eventHandler){
                        subscribers.push({"messageName": messageName, "eventHandler": eventHandler});
                    };

                    return mock;
                })();
                $provide.value('socketShell', that.socketMock);
            });

            inject(function(socketTraffic, $rootScope){
                that.target = socketTraffic;
                that.rootScope = $rootScope;
            })
        });
        it("should attach a message id", function(done){
            var uniqueNamespace = cuid();
            this.target.respond(uniqueNamespace, function(){
                // do nothing
            });
            this.socketMock.raiseEvent(uniqueNamespace, {}, function(messageId){
                expect(messageId.length).toBe(25);
                expect(messageId.substring(0,1)).toBe("c");
                done();
            });
            // This is needed with Angular promises (i.e. $q usage) to trigger the "then"
            this.rootScope.$apply()
        });
        it("call the response function when the namespace event occurs", function(done){
            var uniqueNamespace = cuid();
            var uniqueData = cuid();
            this.target.respond(uniqueNamespace, function(data){
                expect(data).toBe(uniqueData);
                done();
            });
            this.socketMock.raiseEvent(uniqueNamespace, uniqueData, function(){});
        });
        it("should emit a response with '.response' appended to the namespace", function(){
            var uniqueNamespace = cuid();
            var expectedResponseNamespace;
            this.target.respond(uniqueNamespace, function(){}); // do nothing
            this.socketMock.raiseEvent(uniqueNamespace, {}, function(messageId){
                expectedResponseNamespace = uniqueNamespace + "." + messageId + ".response"
            });
            expect(this.socketMock.emit.args[0][0]).toBe(expectedResponseNamespace);
        });
        it("if an error occurs, should emit a response with '.error' appended to the namespace", function(){
            var uniqueNamespace = cuid();
            var expectedResponseNamespace;
            this.target.respond(uniqueNamespace, function(){
                throw new Error("test error");
            });
            this.socketMock.raiseEvent(uniqueNamespace, {}, function(messageId){
                expectedResponseNamespace = uniqueNamespace + "." + messageId + ".error"
            });
            expect(this.socketMock.emit.args[0][0]).toBe(expectedResponseNamespace);
        });
    });
});
