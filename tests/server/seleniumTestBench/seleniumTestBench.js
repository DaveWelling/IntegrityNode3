describe("selenium test bench", function(){
    var driver;
    var defaultWorkspaceId = "ci5cs8jnf00047wmxojtae5mm";
    var chai = require("chai");
    //this.timeout(60000); // Mocha timeout for suite
    before(function(done){
        this.expect = chai.expect;

        var webDriver = require('selenium-webdriver');
        this.By = webDriver.By;
        this.until = webDriver.until;



        var chrome = require('selenium-webdriver/chrome');
        driver = new chrome.Driver();
        var manage = driver.manage();
        var timeouts = manage.timeouts();
        timeouts.pageLoadTimeout(30000);
        timeouts.setScriptTimeout(60000);
        timeouts.implicitlyWait(10000);
        //var .pageLoadTimeout(30000);
        this.driver = driver;
        done();
    });


    it("should do this thing", function(callback) {
        //driver.get('http://www.google.com/ncr');
        //driver.findElement(By.name('q')).sendKeys('webdriver');
        //driver.findElement(By.name('btnG')).click();
        //driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        var driver = this.driver;
        var expect = this.expect;
        driver.get('http://localhost:3000/')
            .then(function(){
                return driver.switchTo().activeElement();
            })
            .then(
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

    after(function(){
        driver.close();
        driver.quit();
    });
});