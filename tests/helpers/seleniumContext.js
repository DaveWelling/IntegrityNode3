(function(seleniumContext){
    var webdriver = require('selenium-webdriver');//var chai = require('chai');
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    seleniumContext.expect = chai.expect;

    var DynamicTreePage = require('./seleniumModules/dynamicTreePage');
    seleniumContext.dynamicTreePage = new DynamicTreePage();

    seleniumContext.workspace = require('./seleniumModules/workspace');
    seleniumContext.workspace.init(this);
})(module.exports);
