
SF.Router = Backbone.Router.extend({
	
	isInit : false,
	currentView : null,
	eventHandlers : {},
	
	routes : {
		"collection" : "_collectionAction",
		"detail" : "_detailAction",
		"cart" : "_cartAction",
		"contact" : "_contactAction",
		"*actions" : "_defaultAction"
	},
	
	/*
	 * collection Action
	 * @private
	 */
	_collectionAction : function() {
		this._displayPage( SF.Events.SHOW_COLLECTIONS );
	},
	
	/*
	 * collection Action
	 * @private
	 */
	_detailAction : function() {
		this._displayPage( SF.Events.SHOW_DETAIL );
	},
	
	/*
	 * collection Action
	 * @private
	 */
	_cartAction : function() {
		this._displayPage( SF.Events.SHOW_CART );
	},
	
	/*
	 * contact Action
	 * @private
	 */
	_contactAction : function() {
		this._displayPage( SF.Events.SHOW_CONTACT );
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
	_displayPage : function ( callbackEvent ) {
		
		if ( !this.isInit ) {
			this._init( callbackEvent );
			return;
		}
		
		if ( this.currentView ) {
			this.currentView.hide( callbackEvent );
		} else {
			SF.EventManager.trigger( callbackEvent );
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
		
		this.eventHandlers[SF.Events.APP_READY] = this._appReady;
		// this.eventHandlers[SF.Events.SHOW_COLLECTIONS] = this._showCollections;
    	// this.eventHandlers[SF.Events.SHOW_DETAIL] = this._showDetail;
    	// this.eventHandlers[SF.Events.SHOW_CART] = this._showCart;
		// this.eventHandlers[SF.Events.SHOW_CONTACT] = this._showContact;
		
		SF.EventManager.bind(this.eventHandlers);
	},
	
	/*
	 * init navigation links
	 * @private
	 */
	_initNav : function() {
		$(".nav a").click(function(e){
			e.preventDefault();
			SF.AppRouter.navigate($(this).attr("href"), true);
		});	
	},
	
	/********
	 * EVENT HANDLERS
	 */
		
	_appReady : function() {
		
		var mainView = new SF.View.Main({
			collection : SF.Data.Collections
		});
		mainView.render();
		this.currentView = mainView;
		
	}
	
});