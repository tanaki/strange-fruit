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
