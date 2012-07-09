
SF.Model.Press = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		title : "",
		slug : "",
		date : "",
		author : "",
		source : "",
		image : "",
		text : ""
	},
	
	initialize: function(){

	},

	parse : function(data){
		
		this.id = data.id;
		this.title = data.title;
		this.slug = data.slug;
		this.date = data.date;
		this.author = data.author;
		this.source = data.source;
		this.image = data.image;
		this.text = data.text;

		return this;
	}
	
});