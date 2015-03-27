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

        var workitem = element.all({name:"workitemContent"});
        var first = workitem.first();
        return {
            get text(){
                return first.getText();
            },
            get exists() {
                return first.isPresent();
            },
            get sibling() {
                return first.getWebElement().findElement(By.xpath("following-sibling::*"));
            },
            get elementCount(){
                return first.getWebElement().findElements(By.xpath("child::*")).then(function(webElements){
                    return webElements.length;
                });

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

