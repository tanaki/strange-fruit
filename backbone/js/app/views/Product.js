
SF.View.Product = SF.View.Base.extend({

	classname : "product",
	template_name : "template_product",
	template_url : "/templates/product.html",

	onFadeIn : function(self){
		self.initThumbnails();
	},

	initThumbnails : function() {
		
		var 
			thumbnails = $(".thumbnails", this.el),
			details = $(".details", this.el);


		$("a", thumbnails).click(function(e){
			e.preventDefault();

			if ( $(this).parent().hasClass("selected") ) return;

			var 
				el = $(this),
				loader = $(".loading"),
				href = el.attr("href"),
				dot = "/img/skin/dot.gif";

			$(".selected", thumbnails).removeClass("selected");
			el.parent().addClass("selected");
			
			if ( el.data("loaded") ) {

				loader.stop(true, true).fadeOut();
				details
					.css("backgroundImage", "url(" + dot + ")")
					.css("backgroundImage", "url(" + href + ")");

			} else {

				loader.stop(true, true).text("Loading...").fadeIn();
				details.css("backgroundImage", "url(" + dot + ")");

				var img = new Image();
				img.onload = function() {
					el.data("loaded", true);
					loader.stop(true, true).fadeOut();
					details.css("backgroundImage", "url(" + img.src + ")");
				}
				img.src = href;

			}
		});

		var mobileThumbnails = $(".mobile-thumbnails", this.el);

		$("a", mobileThumbnails).click(function(e){
			e.preventDefault();
			console.log("click, swipe");
		});

	}
	
});