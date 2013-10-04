// Base Controller

define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	Application.Controller.BaseController = Backbone.View.extend({
		
		initialize: function () {},

		// ------------
		//= Class Methods available for other views 
		// ------------

		initializeViewSafely: function (viewName) {
			if (this.view) {
				this.view.initialize();
			} else {
				this.view = new viewName();
			}
		},

		cleanup: function () {
			$(this).remove();
		}

	});

	return Application.Controller.BaseController;

});