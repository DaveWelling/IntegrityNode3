//(function(world){
//    var driver;
//    world = function() {
//        var webdriver = require("selenium-webdriver");
//        var chrome = require('selenium-webdriver/chrome');
//        driver = new chrome.Driver();
//
//        this.World = function World(callback){
//            this.driver = driver; // Set "World" driver instance
//            console.log("config driver set to this");
//            callback();
//        };
//
//        this.registerHandler('AfterFeatures', function (event, callback) {
//            // clean up!
//            // Be careful, there is no World instance available on `this` here
//            // because all scenarios are done and World instances are long gone.
//            console.log("after features");
//            driver.quit();
//            callback();
//        });
//
//    };
//})(module.exports);


module.exports = function() {
        var webdriver = require("selenium-webdriver");
        var chrome = require('selenium-webdriver/chrome');
        var driver = new chrome.Driver();
        var chai = require("chai");

        this.World = function World(callback){
            this.expect = chai.expect;
            this.driver = driver; // Set "World" driver instance
            callback();
        };

        this.registerHandler('AfterFeatures', function (event, callback) {
            // clean up!
            // Be careful, there is no World instance available on `this` here
            // because all scenarios are done and World instances are long gone.
            driver.quit();
            callback();
        });

    };
