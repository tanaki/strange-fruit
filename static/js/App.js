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
    SHOW_COLLECTIONS : "SHOW_COLLECTIONS",
    SHOW_DETAIL : "SHOW_DETAIL",
    SHOW_CART : "SHOW_CART",
    SHOW_CONTACT : "SHOW_CONTACT"
};

$(window).ready(function(){
	
	SF.AppRouter = new SF.Router();
	Backbone.history.start({ pushState : true });
	
});
