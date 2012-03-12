
SF.Router = Backbone.Router.extend({
	
	isInit : false,
	currentView : null,
	eventHandlers : {},
	
	routes : {
		"about" : "_aboutAction",
		"cart" : "_cartAction",
		"collections" : "_collectionAction",
		"collection/:slug" : "_collectionAction",
		"contact" : "_contactAction",
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
	 * contact Action
	 * @private
	 */
	_contactAction : function() {
		this._displayPage( SF.Events.SHOW_CONTACT );
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
			this._init( callbackEvent );
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
	_init : function( callbackEvent ) {
		this.isInit = true;
		
		this._initEventHandlers();
		this._initNav();

		var self = this;
		SF.Data.Collections = new SF.Collection.CollectionCollection();
		SF.Data.Collections.fetch().success(function(){
			self._displayPage( callbackEvent );
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
		this.eventHandlers[SF.Events.SHOW_CONTACT] = this._show;
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
				view = new SF.View.Main({
					collection : SF.Data.Collections
				});
				SF.AppRouter.navigate("/");
			break;
			
			case SF.Events.SHOW_ABOUT :
				view = new SF.View.About();
			break;
			
			case SF.Events.SHOW_CART :
				view = new SF.View.Cart();
			break;

			case SF.Events.SHOW_COLLECTIONS :
				view = new SF.View.Collections({
					collection : SF.Data.Collections,
					slug : slug
				});
			break;
			
			case SF.Events.SHOW_CONTACT :
				view = new SF.View.Contact();
			break;
			
			case SF.Events.SHOW_PRODUCT :
				view = new SF.View.Product();
			break;

			case SF.Events.SHOW_PRESS :
				view = new SF.View.Press();
			break;

		}
		
		view.render();
		this.currentView = view;
		
	}
	
});