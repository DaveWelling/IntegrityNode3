(function () {
	var Leaf = function(locator){
		this.locator = locator;
		// this ugly xpath is to avoid pulling multiple div>span.icon results
		// while also allowing this code to be used at any level in the tree
		// see http://stackoverflow.com/questions/1390568/how-to-match-attributes-that-contain-a-certain-string
		this.getExpansionIcon = function(){
			var xpath = "./div/span[contains(concat(' ', normalize-space(@class), ' '), ' icon ')]";
			return this.locator.element(by.xpath(xpath));
		}
	};
	Leaf.prototype = Object.create({},{
		text: {get: function(){
			return this.locator.element(by.css("workitem > span")).getText();
		}},
		setCursorPosition: { value: function(index){
			var textElement = this.locator.element(by.css("workitem > span"));
			textElement.click();
			function setCursor(arguments) {
				var range = document.createRange();
				var sel = window.getSelection();
				range.setStart(arguments[0].childNodes[2], arguments[1]);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
			return browser.executeScript(setCursor, textElement.getWebElement(), 5);
		}},
		hasExpansionIcon: {get: function(){
			return this.getExpansionIcon().isDisplayed();
		}},
		expand: {value: function(){
			return this.getExpansionIcon().click();
		}},
		childCount: {get:function(){
			return this.locator.all(by.xpath("./ul/li")).count();
		}},
		child: {value: function(index){
			///html/body/ng-view/ul/li[2]/ul/li[1]/div/span[2]
			var child = this.locator.element(by.xpath("./ul/li["+(index+1)+"]"));
			return new Leaf(child);
		}}
	});
	module.exports = Leaf;
})();
