(function(workspace){
    var webdriver = require('selenium-webdriver');
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
            },
            setText: function(textToSet){
                return first.sendKeys(textToSet, webdriver.Key.ENTER);
            }
        };
    }

    result.init = function(context){

    };

    result.goToNew = function(){
        var workspaceId = cuid();
        return browser.get('#/workspace/'+ workspaceId);
    };


    result.getWorkspaceList = function(){

    };
    module.exports = result;
})();

