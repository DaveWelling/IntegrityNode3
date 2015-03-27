describe("Workspace", function(){
    var context = require('../../helpers/seleniumContext');
    var _ = require('underscore');
    var cuid = require('cuid');
    var mongoWorkitems = require('../../../src/mongoRepositoriesModule/workitems');



    beforeEach(function(){
        return context.workspace.goToNew();
    });

    describe("Create a workitem in a new workspace", function(){
        it("new workitem should be visible", function(){
            return context.expect(context.workspace.workitems.root.exists).to.eventually.be.true;
        });
        it("new workitem should have no text", function(){
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

    describe("Enter a unique name for a new workitem node", function(){
        beforeEach(function(){
            this.workitemText = cuid();
            return context.workspace.workitems.root.setText(this.workitemText);
        });
        it("should attach to the workspace", function(){
            return context.expect(context.workspace.workitems.root.text)
                .to.eventually.equal(this.workitemText);
        });
        it("should be saved to the database", function(){
            return context.expect(mongoWorkitems.getByTitle(this.workitemText)).to.eventually.have.property("title",this.workitemText);
        });
        it("the workitem node should contain only text", function(){
            return context.expect(context.workspace.workitems.root.elementCount)
                .to.eventually.equal(0);
        });
        it("should add a sibling workitem", function(){
            return context.expect(context.workspace.workitems.root.sibling).to.not.eventually.be.null;
        });
    })
});
