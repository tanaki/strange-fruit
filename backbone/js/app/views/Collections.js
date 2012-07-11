
SF.View.Collections = SF.View.Base.extend({
	
	classname : "collections",
	template_name : "template_collections",
	template_url : "/templates/collections.html",

	events: {
		"click .list-collections a": "update"
	},

	update : function(e) {
		e.preventDefault();
		SF.AppRouter.navigate( $(e.currentTarget).attr("href"), {trigger: true} );
	},

	setSlug : function(slug) {
		this.slug = slug;
	},

	onFadeIn : function(self) {
		
		$("body").addClass("visible");

	}
	
});