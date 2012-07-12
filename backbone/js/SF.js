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
		$("body").delegate("a[rel=nav], nav a", "click", function(e){
			e.preventDefault();
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
	},

	onFadeIn : function(self) {
		
		$("body").addClass("visible");

	}
	
});

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