// Create Namespace
var SF = window.SF || {};

/* EVENT MANAGER */
SF.EventManager = SF.EventManager || $({});

/* COLLECTIONS */
SF.Collection = SF.Collection || {};

/* MODELS */
SF.Model = SF.Model || {};

/* VIEWS */
SF.View = SF.View || {};

/* DATA */
SF.Data = SF.Data || {};

/*
 * EVENTS
 */

SF.Events = {
    APP_READY : "APP_READY",
    SHOW_ABOUT : "SHOW_ABOUT",
    SHOW_CART : "SHOW_CART",
    SHOW_COLLECTIONS : "SHOW_COLLECTIONS",
    SHOW_INFOS : "SHOW_INFOS",
    SHOW_PRESS : "SHOW_PRESS",
    SHOW_PRODUCT : "SHOW_PRODUCT"
};

$(window).ready(function(){
	
	SF.AppRouter = new SF.Router();
	Backbone.history.start({ pushState : true });
	
});


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

SF.Model.About = Backbone.Model.extend({
	
	defaults: {
		text : ""
	},
	
	initialize: function(){

	},

	parse : function( data ){
		
		this.text = data.text;

		return this;
	}
	
});

SF.Model.Collection = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		slug : "",
		title : "",
		description : "",
		products : null
	},
	
	initialize: function(){

	},

	parse : function( data ){
		
		this.id = data.id;
		this.slug = data.slug;
		this.title = data.title;
		this.description = data.description;
		
		this.products = new SF.Collection.ProductCollection(data.products);

		return this;
	},

	getProducts : function(a, b, c){
		return this.products.models;
	}
	
});

SF.Model.Press = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		title : "",
		slug : "",
		date : "",
		author : "",
		source : "",
		image : "",
		text : ""
	},
	
	initialize: function(){

	},

	parse : function(data){
		
		this.id = data.id;
		this.title = data.title;
		this.slug = data.slug;
		this.date = data.date;
		this.author = data.author;
		this.source = data.source;
		this.image = data.image;
		this.text = data.text;

		return this;
	}
	
});

SF.Model.Product = Backbone.Model.extend({
	
	defaults: {
		id : 0,
		title : "",
		slug : ""
	},
	
	initialize: function(){

	},

	parse : function(data){
		
		this.id = data.id;
		this.title = data.title;
		this.slug = data.slug;

		return this;
	}
	
});

SF.Collection.Cart = Backbone.Collection.extend({
	
	model : SF.Model.Product

});

SF.Collection.CollectionCollection = Backbone.Collection.extend({
	
	model : SF.Model.Collection,
	url : "/data/collections.json",
	initialize : function() {
		
	},
	parse : function(data){
		return data.collections;
	}
	
});

SF.Collection.PressCollection = Backbone.Collection.extend({
	
	model : SF.Model.Press,
	url : "/data/press.json",
	initialize : function() {
		
	},
	parse : function(data){
		return data.press;
	}
	
});

SF.Collection.ProductCollection = Backbone.Collection.extend({
	
	model : SF.Model.Product,
	initialize : function() {
		
	}
	
});

SF.View.Base = Backbone.View.extend({

	el : ".content",
	tpl : null,
	template_name : "",
	template_url : "",
	collection : null,
	classname : "",
	slug : "",
	
	hide : function (callbackEvent) {
		$(this.el).fadeOut(300, function(){
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
		$(this.el).html( tpl(params) ).hide().fadeIn(300, function(){
			self.onFadeIn(self);
		});
	},

	onFadeIn : function(self){

	}
});

SF.View.About = SF.View.Base.extend({

	classname : "about",
	template_name : "template_about",
	template_url : "/templates/about.html"
	
});

SF.View.Cart = SF.View.Base.extend({

	classname : "cart",
	template_name : "template_cart",
	template_url : "/templates/cart.html"
	
});

SF.View.Collections = SF.View.Base.extend({
	
	classname : "collections",
	template_name : "template_collections",
	template_url : "/templates/collections.html",

	events: {
		"click .list-collections a": "update"
	},

	update : function(e) {
		e.preventDefault();
		SF.AppRouter.navigate( $(e.currentTarget).attr("href"), {trigger: true} );
	},

	setSlug : function(slug) {
		this.slug = slug;
	}
	
});

SF.View.Infos = SF.View.Base.extend({

	classname : "infos",
	template_name : "template_infos",
	template_url : "/templates/infos.html"
	
});

SF.View.Main = SF.View.Base.extend({

	classname : "home",
	template_name : "template_main",
	template_url : "/templates/main.html"
	
});

SF.View.Press = SF.View.Base.extend({

	classname : "press",
	template_name : "template_press",
	template_url : "/templates/press.html"
	
});

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

			$(".selected", thumbnails).removeClass("selected");
			$(this).parent().addClass("selected");
			
			var img = new Image();
			img.onload = function() {
				details.css("backgroundImage", "url(" + img.src + ")");
			}
			img.src = $(this).attr("href");
		});
	}
	
});