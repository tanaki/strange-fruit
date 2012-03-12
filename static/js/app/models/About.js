
SF.Model.About = Backbone.Model.extend({
	
	defaults: {
		text : ""
	},
	
	initialize: function(){

	},

	parse : function( data ){
		
		this.text = data.text;

		return this;
	}
	
});