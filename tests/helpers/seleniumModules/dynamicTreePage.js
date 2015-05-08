(function(){
	var webdriver = require('selenium-webdriver');
	var Tree =      require('./TreeModule');

	var DynamicTreePage = function() {
		// Lazy load Tree when needed.
		var _tree;

		Object.defineProperty(this, "tree", {
			get: function () {
				if (!_tree) {
					_tree = new Tree;
				}
				return _tree;
			}
		});
		this.goTo = function(){
			return browser.get("dynamicTree.html");
		}
	};

	// Put most things on the prototype to minimize space needed.
	DynamicTreePage.prototype = Object.create({}, {
		dataForTree: {get: function(){
			return element(by.id("dataForTree"));
		}},
		setDataForTree: { value: function (jsonData){
			this.dataForTree.clear().sendKeys(JSON.stringify(jsonData));
			return this.bindDataToTree();
		}},
		bindDataToTree: { value: function(){
			return element(by.id("bindToTree")).click();
		}}
	});

	module.exports = DynamicTreePage;
})();

