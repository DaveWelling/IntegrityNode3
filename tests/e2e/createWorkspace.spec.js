describe("Workspace", function(){
    var context = require('../helpers/seleniumContext');
    var _ = require('underscore');
    ////var mongoDocuments = require('../../src/mongoRepositoriesModule/documents');
    //var cuid = require('cuid');


    beforeEach(function(){
        return context.workspace.goToNew();
    });

    describe("Create a workitem in a new workspace", function(){
        it("should exist", function(){
            return context.expect(context.workspace.workitems.root.exists).to.eventually.be.true;
        });
        it("should have no text", function(){
            return context.expect(context.workspace.workitems.root.text).to.eventually.equal('');
        })
    });

    //describe("Workspaces list is available", function(){
    //    it("should contain a list of workspaces", function(){
    //        var expectedWorkspaces = getWorkitemsWithNoParents();
    //        var actualWorkspaces = context.workspace.getWorkspaceList();
    //        for (i=0; i < expectedWorkspaces.length; i++){
    //            expect(_.any(actualWorkspaces, function(w){
    //                w.id === expectedWorkspaces[i].id;
    //            })).to.be.true;
    //        }
    //    });
    //
    //});

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
});
