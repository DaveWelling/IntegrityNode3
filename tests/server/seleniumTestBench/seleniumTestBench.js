describe("selenium test bench", function(){

    describe("index", function(){

        it("should do something", function(){
            browser.get('/#');
            expect(element(By.tagName({tagName: "input", name: "workitem"}))).not.toBe.null;
        });
    });
    //var driver;
    //var chai = require("chai");
    //var q = require('q');
    //before(function(done){
    //    this.expect = chai.expect;
    //
    //    var webDriver = require('selenium-webdriver');
    //    this.By = webDriver.By;
    //    this.until = webDriver.until;
    //
    //
    //
    //    var chrome = require('selenium-webdriver/chrome');
    //    driver = new chrome.Driver();
    //    var manage = driver.manage();
    //    var timeouts = manage.timeouts();
    //    timeouts.pageLoadTimeout(30000);
    //    timeouts.setScriptTimeout(60000);
    //    timeouts.implicitlyWait(10000);
    //    this.driver = driver;
    //    done();
    //});
    //
    //
    //it("should do this thing", function(callback) {
    //    var driver = this.driver;
    //    var expect = this.expect;
    //    var until = this.until;
    //    var By = this.By;
    //    driver.get('http://localhost:3000/');
    //    //var input = driver.findElement(By.tagName("input"));
    //    var input = driver.findElement({tagName: "input", name: "workitem"});
    //    this.driver.wait(until.elementIsSelected(input),3000);
    //    input.getOuterHtml().then(function(html){
    //        console.log(html);
    //    });
    //
    //    q.all([
    //        input.getAttribute("value"),
    //        input.getTagName(),
    //        input.getAttribute("name")
    //    ]).then(function(results){
    //        expect(results[0]).to.equal("");
    //        expect(results[1]).to.equal("input");
    //        expect(results[2]).to.equal("workitem");
    //        callback();
    //    }, callback);
    //});
    //
    //after(function(callback){
    //    driver.quit().then(
    //    callback
    //    ,function(error){
    //        callback(error);
    //    });
    //});
});