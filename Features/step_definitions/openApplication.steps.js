var openApplicationStepDefinitionsWrapper = function () {
    var defaultWorkspaceId = "ci5cs8jnf00047wmxojtae5mm";
    var By = require('selenium-webdriver').By,
        until = require('selenium-webdriver').until;
    var cuid = require('cuid');
    this.Before(function(callback){
        console.log("before hook");
        callback();
    });
    this.After(function(callback){
        callback();
    });

    this.Given(/^the application has not been used before$/, function (callback) {
        // probably need to remove a flag or some data here to make it look like the first time.
        callback();
    });

    this.When(/^I open the application$/, function (callback) {
        this.driver.get('http://localhost:3000/').then(
                function(){
                    callback();
                },
                function(ex){
                    callback.fail(ex);
                }
            );
    });

    this.Then(/^the default workspace should be shown$/, function (callback) {
        var expect = this.expect;
        this.driver.getCurrentUrl().then(function(url){
            expect(url).to.equal("http://localhost:3000/#/workspace/" + defaultWorkspaceId);
            callback();
        },
        function(err){
            callback.fail(err);
        })
    });

    this.Then(/^the workplace should have an new workitem focused$/, function (callback) {
        this.driver.switchTo().activeElement().then(
            function(element){
                expect(element.value).to.equal("");
                expect(element.name).to.equal("workItem");
                callback();
            },
            function(error){
                callback.fail(error);
            }
        );
    });
};
module.exports = openApplicationStepDefinitionsWrapper;