
SF.Collection.CollectionCollection = Backbone.Collection.extend({
	
	model : SF.Model.Collection,
	url : "/data/collections.json",
	initialize : function() {
		
	},
	parse : function(data){
		return data.collections;
	}
	
});