
SF.Router = Backbone.Router.extend({
	
	isInit : false,
	currentView : null,
	eventHandlers : {},

	mainView : null,
	aboutView : null,
	cartView : null,
	collectionsView : null,
	infosView : null,
	pressView : null,
	productView : null,

	imageLoaded : [],
	
	routes : {
		"about" : "_aboutAction",
		"cart" : "_cartAction",
		"collections" : "_collectionAction",
		"collections/:slug" : "_collectionAction",
		"infos" : "_infosAction",
		"press" : "_pressAction",
		"product/:slug" : "_productAction",
		"*actions" : "_defaultAction"
	},
	
	/*
	 * about Action
	 * @private
	 */
	_aboutAction : function() {
		this._displayPage( SF.Events.SHOW_ABOUT);
	},
	
	/*
	 * about Action
	 * @private
	 */
	_cartAction : function() {
		this._displayPage( SF.Events.SHOW_CART);
	},

	/*
	 * collection Action
	 * @private
	 */
	_collectionAction : function(slug) {
		this._displayPage( SF.Events.SHOW_COLLECTIONS, slug );
	},
	
	/*
	 * infos Action
	 * @private
	 */
	_infosAction : function() {
		this._displayPage( SF.Events.SHOW_INFOS );
	},
	
	/*
	 * press Action
	 * @private
	 */
	_pressAction : function() {
		this._displayPage( SF.Events.SHOW_PRESS );
	},
	
	/*
	 * product Action
	 * @private
	 */
	_productAction : function(slug) {
		this._displayPage( SF.Events.SHOW_PRODUCT, slug );
	},
	
	/*
	 * defaultAction
	 * @private
	 */
	_defaultAction : function() {
		this._displayPage( SF.Events.APP_READY );
	},
	
	/*
	 * display Page
	 * @private
	 */
	_displayPage : function ( callbackEvent, slug ) {

		if ( !this.isInit ) {
			this._init( callbackEvent, slug );
			return;
		}
		
		if ( this.currentView ) {
			this.currentView.hide( callbackEvent );
		} else {
			SF.EventManager.trigger( callbackEvent, slug );
		}
	},
	
	/*
	 * init app
	 * @private
	 */
	_init : function( callbackEvent, slug ) {

		this.isInit = true;
		
		this._initEventHandlers();
		this._initNav();

		var 
			self = this,
			images = [
				"/img/logo.png",
				"/img/skin/bg_cart.png",
				"/img/skin/bg_collection-link.png",
				"/img/skin/bg_collections.png",
				"/img/skin/bg_grid.png",
				"/img/skin/bg_menu.png",
				"/img/skin/pdf.png"
			];

		self._preloadImages( images, function(){

			SF.Data.Images = self.imageLoaded;
			self.imageLoaded = [];
			$(".loading").hide();

			SF.Data.Collections = new SF.Collection.CollectionCollection();
			SF.Data.Collections.fetch().success(function(){
				self._displayPage( callbackEvent, slug );
			});
		});
	},

	_preloadImages : function ( imageArray, callback ) {

		var 
			self = this,
			img = new Image();

		img.onload = function() {

			self.imageLoaded.push(img);
			imageArray.shift();

			if ( imageArray.length > 0 ) {
				self._preloadImages( imageArray, callback );
			} else {
				callback();
			}

			var percent = (self.imageLoaded.length * 100) / (imageArray.length + self.imageLoaded.length);
			$(".loading").text("Loading... " + Math.round(percent) + "%" );
		}
		img.src = imageArray[0];

	},
	
	/*
	 * init event handler
	 * @private
	 */
	_initEventHandlers : function() {
		
		this.eventHandlers[SF.Events.APP_READY] = this._show;
    	this.eventHandlers[SF.Events.SHOW_ABOUT] = this._show;
    	this.eventHandlers[SF.Events.SHOW_CART] = this._show;
		this.eventHandlers[SF.Events.SHOW_COLLECTIONS] = this._show;
		this.eventHandlers[SF.Events.SHOW_INFOS] = this._show;
		this.eventHandlers[SF.Events.SHOW_PRESS] = this._show;
		this.eventHandlers[SF.Events.SHOW_PRODUCT] = this._show;
		
		SF.EventManager.bind(this.eventHandlers);
	},
	
	/*
	 * init navigation links
	 * @private
	 */
	_initNav : function() {
		
		$(".menu-btn").mouseenter(function(){
			$("nav").addClass("open");
		});
		$("nav").mouseleave(function(){
			$("nav").removeClass("open");
		});

		// $(".menu-btn").click(function(e){
		// 	e.preventDefault();
		// 	$("nav").toggleClass("open");
		// });

		$("body").delegate("a[rel=nav], nav a", "click", function(e){
			e.preventDefault();
			// $("nav").removeClass("open");
			SF.AppRouter.navigate($(this).attr("href"), true);
		});	
	},
	
	/********
	 * EVENT HANDLERS
	 */
		
	_show : function( e, slug ) {

		var 
			self = SF.AppRouter,
			view;
		
		switch ( e.type ) {
			
			case SF.Events.APP_READY :
				if ( !self.mainView ) 
					self.mainView = new SF.View.Main({
						collection : SF.Data.Collections
					});
				view = self.mainView;
				SF.AppRouter.navigate("/");
			break;
			
			case SF.Events.SHOW_ABOUT :
				if ( !self.aboutView ) self.aboutView = new SF.View.About();
				view = self.aboutView;
			break;
			
			case SF.Events.SHOW_CART :
				if ( !self.cartView ) self.cartView = new SF.View.Cart();
				view = self.cartView;
			break;

			case SF.Events.SHOW_COLLECTIONS :
				if ( !self.collectionsView ) 
					self.collectionsView = new SF.View.Collections({
						collection : SF.Data.Collections
					});
				self.collectionsView.setSlug(slug);
				view = self.collectionsView;
			break;
			
			case SF.Events.SHOW_INFOS :
				if ( !self.infosView ) self.infosView = new SF.View.Infos();
				view = self.infosView;
			break;
			
			case SF.Events.SHOW_PRODUCT :
				if ( !self.productView ) self.productView = new SF.View.Product();
				view = self.productView;
			break;

			case SF.Events.SHOW_PRESS :
				if ( !self.pressView ) self.pressView = new SF.View.Press();
				view = self.pressView;
			break;

		}
		
		view.render();
		self.currentView = view;
		
	}
	
});