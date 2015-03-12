(function(workspace){
    var cuid = require('cuid');
    var result = {
        get workitems() {
            return {
                get root() {
                    return getWorkItemRoot();
                }
            }
        }
    };

    function getWorkItemRoot(){
        var first = element.all({name:"workitemContent"}).first();
        return {
            get text(){
                return first.getText();
            },
            get exists() {
                return first.isPresent();
            }
        };
    }

    result.init = function(context){

    };

    result.goToNew = function(){
        var workspaceId = cuid();
        return browser.get('#/workspace/'+ workspaceId);
    };

    //Object.defineProperty(workspace, "workitems", {
    //    get: function(){
    //        return {
    //            get root() {
    //                return getWorkItemRoot();
    //            }
    //        }
    //    }
    //});

    result.getWorkspaceList = function(){

    };
    module.exports = result;
})();

