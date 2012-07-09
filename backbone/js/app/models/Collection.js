
SF.Model.Collection = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		slug : "",
		title : "",
		description : "",
		products : null
	},
	
	initialize: function(){

	},

	parse : function( data ){
		
		this.id = data.id;
		this.slug = data.slug;
		this.title = data.title;
		this.description = data.description;
		
		this.products = new SF.Collection.ProductCollection(data.products);

		return this;
	},

	getProducts : function(a, b, c){
		return this.products.models;
	}
	
});