
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

		if ( $(window).width() > 800 ) {

			$("a", thumbnails).click(function(e){
				e.preventDefault();

				if ( $(this).parent().hasClass("selected") ) return;

				$(".selected", thumbnails).removeClass("selected");
				$(this).parent().addClass("selected");
				
				var img = new Image();
				img.onload = function() {
					details.css("backgroundImage", "url(" + img.src + ")");
				}
				img.src = $(this).attr("href");
			});

		} else {

			$("img", thumbnails).each(function(i, el){
				var el = $(el);
				el.attr("src", el.data("mobile"));
			});

			var s = new Swipe( document.getElementById("product-thumbnails") );
			$("a", thumbnails).click(function(e){
				e.preventDefault();
				s.next();
			});

		}
	}
	
});