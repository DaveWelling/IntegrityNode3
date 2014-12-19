(function(guid){

    guid.getNew = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    guid.isGuid = function (guidText) {
        var re = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
        return re.test(guidText);
    };

    guid.getGuidFromString = function (testString) {
        var re = /[a-fA-F0-9]{8}(?:-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12}/i;
        var results = re.exec(testString);
        return (results ? results[0] : null);
    };

    guid.emptyGuid = '00000000-0000-0000-0000-000000000000';
    guid.defaultId = '732A7E91-01F3-4C81-B7C2-931F23169E2C';

})(module.exports);
