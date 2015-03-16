describe("workitemService", function(){
    beforeEach(function(){
        var that = this;
        module('commonModule', function($provide) {
            that.mockSocketTraffic = {
                request: sinon.spy(),
                respond: sinon.spy()
            };
            $provide.value('socketTraffic', that.mockSocketTraffic);
        });
        module("workitemModule");
        inject(function($injector) {
            that.target = $injector.get('workitemService');
        });
    });
    it("get should request a workitem from server using a given id", function(){
        var id = cuid();
        this.target.get(id);
        expect(this.mockSocketTraffic.request.withArgs("workitem.get", id).calledOnce).toBe(true);
    });
    it("create should send a new workitem to the server", function(){
        var workitem = {"id": cuid(), "title": "test workitem"};
        this.target.create(workitem);
        expect(this.mockSocketTraffic.request.withArgs("workitem.create", workitem).calledOnce).toBe(true);
    });
    it("update should send a change for a workitem to the server", function(){
        var update = {
            "id": cuid(),
            "title": "some changed value"
        };
        this.target.update(update);
        expect(this.mockSocketTraffic.request.withArgs("workitem.update", update).calledOnce).toBe(true);
    });
    it("remove should send a request to remove a workitem to the server using a given id", function(){
        var id = cuid();
        this.target.remove(id);
        expect(this.mockSocketTraffic.request.withArgs("workitem.remove", id).calledOnce).toBe(true);
    });
});
