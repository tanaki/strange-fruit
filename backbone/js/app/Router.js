
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

		var self = this;
		SF.Data.Collections = new SF.Collection.CollectionCollection();
		SF.Data.Collections.fetch().success(function(){
			self._displayPage( callbackEvent, slug );
		});
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
		$("body").delegate("a[rel=nav], nav a", "click", function(e){
			e.preventDefault();
			SF.AppRouter.navigate($(this).attr("href"), true);
		});	
	},
	
	/********
	 * EVENT HANDLERS
	 */
		
	_show : function( e, slug ) {

		var view;
		
		switch ( e.type ) {
			
			case SF.Events.APP_READY :
				if ( !this.mainView ) 
					this.mainView = new SF.View.Main({
						collection : SF.Data.Collections
					});
				view = this.mainView;
				SF.AppRouter.navigate("/");
			break;
			
			case SF.Events.SHOW_ABOUT :
				if ( !this.aboutView ) this.aboutView = new SF.View.About();
				view = this.aboutView;
			break;
			
			case SF.Events.SHOW_CART :
				if ( !this.cartView ) this.cartView = new SF.View.Cart();
				view = this.cartView;
			break;

			case SF.Events.SHOW_COLLECTIONS :
				if ( !this.collectionsView ) 
					this.collectionsView = new SF.View.Collections({
						collection : SF.Data.Collections
					});
				this.collectionsView.setSlug(slug);
				view = this.collectionsView;
			break;
			
			case SF.Events.SHOW_INFOS :
				if ( !this.infosView ) this.infosView = new SF.View.Infos();
				view = this.infosView;
			break;
			
			case SF.Events.SHOW_PRODUCT :
				if ( !this.productView ) this.productView = new SF.View.Product();
				view = this.productView;
			break;

			case SF.Events.SHOW_PRESS :
				if ( !this.pressView ) this.pressView = new SF.View.Press();
				view = this.pressView;
			break;

		}
		
		view.render();
		this.currentView = view;
		
	}
	
});