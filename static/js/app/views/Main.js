
SF.View.Main = Backbone.View.extend({

	el : ".content",
	mainTpl : null,
	collection : null,
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) SF.EventManager.trigger(callbackEvent);
	},
	
	render : function() {
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		$.loadTemplate({
			"template" : "template_main",
			"file" : "templates/main.html",
			"callback" : function(data){
				self.mainTpl = data;
				self._display();
			},
			"noStorage" : true // util for debug
		});
		
	},
	
	_display : function(data) {
		var 
			params = {
				collections : this.collection.models
			},
			tpl = _.template(this.mainTpl);
		
		$(this.el).html( tpl(params) );
	}
});