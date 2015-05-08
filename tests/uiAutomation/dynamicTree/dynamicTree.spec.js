describe("Dynamic Tree", function () {
	var context = require('../../helpers/seleniumContext');

	beforeEach(function(){
		context.dynamicTreePage.goTo();
	});


	describe("with multiple roots", function () {
		it("should display two root UI nodes for two root data nodes", function () {
			context.dynamicTreePage.setDataForTree([
				{title:"root1"},
				{title:"root2"}
			]);
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.text
			).to.eventually.equal("root1");
		});
	});

	describe("first root node", function () {
		it("has expected title text", function () {
			context.dynamicTreePage.setDataForTree([
				{title:"root1"},
				{title:"root2"}
			]);
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.text
			).to.eventually.equal("root1");
		});
		it("has no expansion icon if it has no children", function () {
			context.dynamicTreePage.setDataForTree([{title:"root1"}]);
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.hasExpansionIcon
			).to.eventually.be.false;

		});
		it("has an expansion icon if it has children", function () {
			context.dynamicTreePage.setDataForTree([
				{
					title:"root1",
					links: [
						{title: "child1"},
						{title: "child2"}
					]
				}
			]);
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.hasExpansionIcon
			).to.eventually.be.true;
		});
		it("shows children when expansion icon is clicked", function () {
			context.dynamicTreePage.setDataForTree([
				{
					title:"root1",
					links: [
						{title: "child1"},
						{title: "child2"}
					],
					collapsed: true
				}
			]);
			context.dynamicTreePage.tree.firstRoot.expand();
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.childCount
			).to.eventually.equal(2);
		});
		it("has no children when collapsed", function () {
			context.dynamicTreePage.setDataForTree([
				{
					title:"root1",
					links: [
						{title: "child1"},
						{title: "child2"}
					],
					collapsed: true
				}
			]);
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.childCount
			).to.eventually.equal(0);
		});
		it("has second child given corresponding binding data", function () {
			context.dynamicTreePage.setDataForTree([
				{
					title:"root1",
					links: [
						{title: "child1"},
						{title: "child2"}
					]
				}
			]);
			return context.expect(
				context.dynamicTreePage.tree.firstRoot.child(1).text
			).to.eventually.equal("child2");
		});
	});
});

