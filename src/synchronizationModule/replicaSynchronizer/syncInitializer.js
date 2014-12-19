(function(syncInitializer){
    syncInitializer.Instance = function(context){
        var that = this;
        if (!context){
            throw new Error("A sync context must be passed into the syncInitializer Instance");
        }
        this.gatherChanges = function gatherChanges(){
            var changes = context.replica.getChanges();
        };
        this.begin = function(){
            var changes = that.gatherChanges();
            return changes.then(function(returned){
                return context.syncResponder.respond(returned);
            });

        };


    };


})(module.exports);
