var createAnOutlineStepDefinitionsWrapper = function () {
    var By = require('selenium-webdriver').By,
        until = require('selenium-webdriver').until,
        webdriver = require('selenium-webdriver');
    var mongoDocuments = require('../../src/mongoRepositoriesModule/documents');
    var cuid = require('cuid');

    this.Before(function(callback){
        this.workspaceId = cuid();
        this.uniqueValue = cuid();
        callback();

    });

    this.Given(/^a new empty workspace$/, function (callback) {
        this.driver.get('http://localhost:3000/#/workspace/'+ this.workspaceId)
            .then(callback, callback.fail);
    });

    this.When(/^I begin typing a unique string and hit enter$/, function (callback) {
        var input = this.driver.findElement({tagName: "input", name: "workitem"});
        this.driver.wait(until.elementIsSelected(input), 3000);
        var title = this.uniqueValue;
        input.sendKeys(title, webdriver.Key.ENTER).then(callback,callback.fail);
        callback();
    });

    this.Then(/^a new node will be attached with a title of the unique string$/, function (callback) {
        var newNode = this.driver.findElement({tagName: "span", name: "workitem"});
        var title = this.uniqueValue;
        newNode.getText().then(function(result){
            expect(result).to.equal(title);
            callback();
        }, callback.fail);
    });

    this.Then(/^the database will contain the new node$/, function (callback) {
        var title = this.uniqueValue;
        mongoDocuments.getByTitle(title).then(function(workspace){
            expect(workspace.title).to.equal(title)
        }, callback.fail);
    });
};
module.exports = createAnOutlineStepDefinitionsWrapper;