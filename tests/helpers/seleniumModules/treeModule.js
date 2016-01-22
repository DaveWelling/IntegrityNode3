(function () {
	var Leaf = require("./LeafModule");
	var Tree = function(){

	};
	Tree.prototype = Object.create({},{
		firstRoot: {get: function(){
			var firstRoot = element.all(by.css("body > div > workitem-tree > ul > li")).first();
			return new Leaf(firstRoot);
		}}
	});

	module.exports = Tree;
})();
