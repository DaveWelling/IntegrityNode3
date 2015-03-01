describe("Create a workspace", function(){
    var webdriver = require('selenium-webdriver');
    //var mongoDocuments = require('../../src/mongoRepositoriesModule/documents');
    var cuid = require('cuid');
    describe("Create a workitem in a new workspace", function(){
        var workspaceId;
        var uniqueValue;
        beforeEach(function(){
            uniqueValue = cuid();
            workspaceId = cuid();
            browser.get('#/workspace/'+ workspaceId);
        });
        it("should have one empty editable workitem visible", function(done){
            element.all({name:"workitem"}).then(function(emptyWorkItems){
                expect(emptyWorkItems.length).toBe(1);
                expect(emptyWorkItems[0].getText()).toBe("");
                expect(emptyWorkItems[0].isSelected()).toBe(true);
                // TODO: Add test for minimum width so that a user can click on
                // the editable span
                done();
            }, done);
        });
        //describe("Enter a unique name for a new workitem node", function(){
        //    beforeEach(function(){
        //        element({tagName: "input", name: "workitem"}).sendKeys(uniqueValue, webdriver.Key.ENTER);
        //    });
        //    it("should attach to the workspace", function(){
        //        var newNode = element({tagName: "span", name: "workitem"});
        //        expect(newNode.getText()).toBe(uniqueValue);
        //    });
        //    it("should be saved to the database", function(){
        //
        //    });
        //})

    })
});
