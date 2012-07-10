
SF.View.Infos = SF.View.Base.extend({

	classname : "infos",
	template_name : "template_infos",
	template_url : "/templates/infos.html",

	onFadeIn : function(self){
		self.initFAQ();
	},

	initFAQ : function() {

		var 
			accordion = $(".accordion"),
			question = $(".question", accordion),
			links = $(".question a", accordion),
			spans = $(".question .answer", accordion);

		spans.each(function(i, el){
			var 
				span = $(el),
				h = span.height();
			span.data("height", h);
			if ( !span.parent().hasClass("open") ) span.css("height", 0);
			else span.css("height", h);
			span.addClass("ready");
		});
		accordion.css("opacity", 1);

		links.click(function(e){

			e.preventDefault();
			var 
				el = $(this),
				parent = el.parent(),
				next = el.next();

			if ( parent.hasClass("open") ) return;

			var currentOpen = $(".open", accordion);
			currentOpen.find(".answer").css("height", 0);
			currentOpen.removeClass("open");

			parent.addClass("open");
			next.css("height", next.data("height"));

		});

	}
	
});