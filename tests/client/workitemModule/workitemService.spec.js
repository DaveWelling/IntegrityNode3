describe("workitemService", function(){
    var mockSocketFactory;
    var target;
    beforeEach(function(){
        var that = this;
        module('commonModule', function($provide) {
            that.mockSocketFactory = {emit: sinon.spy()};
            $provide.value('socketApiFactory', that.mockSocketFactory);
        });
        module("workitemModule");
        inject(function($injector) {
            that.target = $injector.get('workitemService');
        });
    });
    it("get should request a workitem from server using a given id", function(){
        var id = cuid();
        this.target.get(id);
        expect(this.mockSocketFactory.emit.withArgs("workitem.get", id).calledOnce).toBe(true);
    });
    it("create should send a new workitem to the server", function(){
        var workitem = {"id": cuid(), "title": "test workitem"};
        this.target.create(workitem);
        expect(this.mockSocketFactory.emit.withArgs("workitem.create", workitem).calledOnce).toBe(true);
    });
    it("update should send a change for a workitem to the server", function(){
        var update = {
            "id": cuid(),
            "title": "some changed value"
        };
        this.target.update(update);
        expect(this.mockSocketFactory.emit.withArgs("workitem.update", update).calledOnce).toBe(true);
    });
    it("delete should send a request to remove a workitem to the server using a given id", function(){
        var id = cuid();
        this.target.delete(id);
        expect(this.mockSocketFactory.emit.withArgs("workitem.delete", id).calledOnce).toBe(true);
    });
});
