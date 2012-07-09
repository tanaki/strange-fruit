
SF.Collection.PressCollection = Backbone.Collection.extend({
	
	model : SF.Model.Press,
	url : "/data/press.json",
	initialize : function() {
		
	},
	parse : function(data){
		return data.press;
	}
	
});