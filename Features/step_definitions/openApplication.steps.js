var openApplicationStepDefinitionsWrapper = function () {
    var defaultWorkspaceId = "ci5cs8jnf00047wmxojtae5mm";
    var By = require('selenium-webdriver').By,
        until = require('selenium-webdriver').until;
    var cuid = require('cuid');
    var q = require('q');

    this.Given(/^the application has not been used before$/, function (callback) {
        // probably need to remove a flag or some data here to make it look like the first time.
        callback();
    });

    this.When(/^I open the application$/, function (callback) {
        this.driver.get('http://localhost:3000/').then(callback,callback.fail);
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
        var expect = this.expect;
        var driver = this.driver;
        var input = driver.findElement({tagName: "input", name: "workitem"});
        until.elementIsSelected(input);
        q.all([
            input.getAttribute("value"),
            input.getTagName(),
            input.getAttribute("name")
        ]).then(function(results){
            expect(results[0]).to.equal("");
            expect(results[1]).to.equal("input");
            expect(results[2]).to.equal("workitem");
            callback();
        }, callback.fail);
    });
};
module.exports = openApplicationStepDefinitionsWrapper;