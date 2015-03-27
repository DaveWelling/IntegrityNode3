describe("workitemDirective", function () {
    beforeEach(function(){
        var that = this;
        module("my.templates");
        module("workitemModule", function($provide){
            that.workitemService = {
                create: sinon.spy()
            };
            $provide.value('workitemService', that.workitemService);
        });
        //inject(function($injector) {
        //    that.target = $injector.get('workitemDirective');
        //});
        inject(function($rootScope, $compile) {
            this.testTitle = "test title";
            scope = $rootScope.$new();
            this.rootScope = scope;
            scope.node = {title:this.testTitle, nodes:{}};
            element = '<workitem ng-model="node" has-focus="true"></workitem>';
            element = $compile(element)(scope);
            scope.$digest();
        })
    });

    it("should have test title text", function(){
        var workitem = element[0];
        var span = workitem.children[0];
        expect(span.innerText).toBe(this.testTitle);
    });
    describe("user hits enter", function () {
        it("should save a workitem", function(){
            var isolated = element.isolateScope();
            isolated.titleKeyPress({which:13, preventDefault: function(){}});
            expect(this.workitemService.create.calledOnce).toBe(true);
        });
        it("should save workitem with title 'test title'", function(){
            var isolated = element.isolateScope();
            isolated.titleKeyPress({which:13, preventDefault: function(){}});
            expect(this.workitemService.create.args[0][0].title).toBe(this.testTitle);
        });
        it("should request that a sibling be added", function(done){
            var that = this;
            var isolated = element.isolateScope();

            this.rootScope.$on("addSibling", function(event, data){
                expect(data.title).toBe(that.testTitle);
                done();
            });
            isolated.titleKeyPress({which:13, preventDefault: function(){}});
            this.rootScope.$apply()
        });
    });
});
