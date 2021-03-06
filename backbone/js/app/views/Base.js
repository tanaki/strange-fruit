
SF.View.Base = Backbone.View.extend({

	el : ".content",
	tpl : null,
	template_name : "",
	template_url : "",
	collection : null,
	classname : "",
	slug : "",
	
	hide : function (callbackEvent) {

		var $el = $(this.el);
		$el.fadeOut(300, function(){
			if (callbackEvent) SF.EventManager.trigger(callbackEvent);
		});
		
	},
	
	render : function() {
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		$.loadTemplate({
			"template" : self.template_name,
			"file" : self.template_url,
			"callback" : function(data){
				self.tpl = data;
				self._display();
			},
			"noStorage" : true // util for debug
		});
		
	},
	
	_display : function(data) {
		
		var 
			self = this,
			models = this.collection ? this.collection.models : null,
			params = {
				collections : models,
				slug : this.slug
			},
			tpl = _.template(this.tpl);
		
		$("body").attr("class", "").addClass(this.classname);
		$(this.el).html( tpl(params) ).hide().fadeIn(500, function(){
			self.onFadeIn(self);
		});
	},

	onFadeIn : function(self){

	}
});