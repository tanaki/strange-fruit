
SF.Model.Collection = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		slug : "",
		title : "",
		description : "",
		items : null
	},
	
	initialize: function(){

	},

	parse : function( data ){
		
		this.id = data.id;
		this.slug = data.slug;
		this.title = data.title;
		this.description = data.description;
		
		this.items = new SF.Collection.ItemCollection(data.items);

		return this;
	}
	
});