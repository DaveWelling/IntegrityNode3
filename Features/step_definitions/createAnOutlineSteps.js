var createAnOutlineStepDefinitionsWrapper = function () {
    //var document = require('../../src/businessLogicModule/document');
    //var workspace = require('../../src/businessLogicModule/workspace');
    //var testWorkspace;
    //var testDocumentTitle = "a test document";
    //this.Before("@SetupOutline", function(callback){
    //
    //});
    var chai = require("chai");
    var webdriver = require('selenium-webdriver');
    var By = require('selenium-webdriver').By,
        until = require('selenium-webdriver').until;
    var cuid = require('cuid');
    this.Before(function(callback){
        chai.should();
        console.log("before hook");
        callback();
    });
    this.After(function(callback){
        callback();
    });

    this.When(/^I try to add a node$/, function (callback) {
        document.create(testDocumentTitle, testWorkspace.getRootDocument())
            .then(callback, callback.fail);
    });

    this.Then(/^a new node will be attached$/, function (callback) {
        var newNodeLink = testWorkspace.root.links[0];
        var testDocument = testWorkspace.getDocumentForLink(newNodeLink);
        testDocument.title.should.equal(testDocumentTitle);
        callback();
    });


    this.Given(/^a new empty workspace$/, function (callback) {
        try{
            console.log("here");
            this.driver.get('http://localhost:3000/workspace');
            callback();
        } catch (ex){
            callback.fail(ex);
        }
    });

    this.When(/^I begin typing "([^"]*)" and hit enter$/, function (arg1, callback) {
        try {
            var newNode = this.driver.findElement(By.id("document0"));
            newNode.sendKeys(arg1, webdriver.Key.ENTER).then(
                function(){
                    callback();
                }, function(err){
                    callback.fail(err);
                }
            );
        } catch(ex){
            callback.fail(ex);
        }
    });

    this.Then(/^a new node will be attached with title "([^"]*)"$/, function (arg1, callback) {
        var newNode = this.driver.findElement(By.id("document0"));
        var nodeText = newNode.getAttribute("value");
        nodeText.then(function(result){
            expect(result).to.equal(arg1);
            callback();
        }, function(err){
            callback.fail(err);
        });

    });

    this.Then(/^the database will contain the new node$/, function (callback) {
        callback.pending();
    });
};
module.exports = createAnOutlineStepDefinitionsWrapper;