
SF.Model.Item = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		title : "",
		slug : ""
	},
	
	initialize: function(){

	},

	parse : function(data){
		
		this.id = data.id;
		this.title = data.title;
		this.slug = data.slug;

		return this;
	}
	
});