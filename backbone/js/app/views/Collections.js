
SF.View.Collections = SF.View.Base.extend({
	
	classname : "collections",
	template_name : "template_collections",
	template_url : "/templates/collections.html",

	events: {
		"click .collection-item a": "update"
	},

	update : function(e) {
		e.preventDefault();
		SF.AppRouter.navigate( $(e.currentTarget).attr("href"), true );
	},

	setSlug : function(slug) {
		this.slug = slug;
	}
	
});