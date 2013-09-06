define([
	'underscore',
	'backbone',
	'bootstrap',
	'utilities',
	'base_controller',
	'projects_collection',
	'projects_collection_view',
	'projects_show_controller',
	'project_form_view',
	'projects_app',
	'modal_component',
	'project_edit_form_view',
	'autocomplete'
], function (
	_, Backbone, Bootstrap, Utilities, BaseController, 
	ProjectsCollection, ProjectsCollectionView, ProjectShowController, 
	ProjectFormView, ProjectApp, ModalComponent, ProjectEditFormView, autocomplete) {
	
	Application.Project.ListController = BaseController.extend({

		el: "#container",

		events: {
			"click .project"				: "show",
			"click .add-project"		: "add",
			"click .edit-project"		: "edit",
			"click .delete-project"	: "delete",
			"keyup .search"					: "search"
		},

		initialize: function () {
			var self = this;

			this.fireUpProjectsCollection();
			this.bindToProjectFetchListeners();
			this.collection.trigger("projects:fetch");

			this.listenTo(this.collection, "project:save:success", function () {
				$(".modal-backdrop").hide();
      	$(".modal").modal('hide');
      	self.renderProjectCollectionView();
			})
		},

		fireUpProjectsCollection: function () {
			if (this.collection) {
				this.collection;
			} else {
				this.collection = new ProjectsCollection();
			}
		},

		bindToProjectFetchListeners: function () {
			var self = this;
			this.listenToOnce(this.collection, "projects:fetch", function () {
				self.collection.fetch({
					success: function (collection) {
						self.renderProjectCollectionView(collection);
					}
				})
			})
		},

		renderProjectCollectionView: function (collection) {
			this.projectCollectionView ?	
				this.projectCollectionView.render() :
				this.projectCollectionView = new ProjectsCollectionView({
					el: "#container",
					onRender: true,
					collection: collection
				}).render();
		},

		// -----------------------
		//= BEGIN CLASS METHODS
		// -----------------------
		show: function (e) {
			if (e.preventDefault()) e.preventDefault();

			var attr 	= $(e.currentTarget).closest(".project-title").children(".project").text(),
					model = getCurrentModelFromFormAttributes(this.collection, attr);

			if (this.projectShowController) this.projectShowController.cleanup();
			this.projectShowController = new ProjectShowController({ model: model })
		},

		add: function (e) {
			if (e.preventDefault()) e.preventDefault();
			var self = this;

      if (this.modalComponent) this.modalComponent;
      this.modalComponent = new ModalComponent({
        el: "#container",
        id: "addProject",
        modalTitle: "Add Project"
      }).render();  

      if (!_.isUndefined(this.modalComponent)) {
        if (this.projectFormView) this.projectFormView();
        this.projectFormView = new ProjectFormView({
          el: ".modal-body",
          collection: self.collection
        }).render();  
      }

		},

		search: function (e) {
			var enterKey = 13;

			// If they hit the enter key to turn off the default alert that pops up, then
			// don't allow that to continually bubble the autcomplete (which would otherwise cause a loop).
			// This enter key stops it.
			if (e.keyCode === enterKey) return;

			// So far we can pass to this plugin:
			// Backbone params: 
			// 	backboneEvents: true/false,
			// 	backbone: {
			// 		view: 'viewName',
			// 		model: 'modelName'
			// 	}
			// NonBackbone params:
			// 	on: 'keyup/keydown/click/etc',
			// 	apiEndpoint: '/some/server/path?query=',
			// 	type: 'POST/GET/etc',
			// 	searchResultsClass: '.class-name-of-wrapper-for-search-results'
			// 	
			// Note: You can use this with the backbone eventing system, by delegating your input element 
			// to a backbone event on keypress/keyup, etc, and then in the function caller for that initialize this 
			// plugin.  It needs to be initialized in line on the keyup, because the function does a check and then goes out
			// to the server on each keypress.
			$(".search").midasAutocomplete({
				backboneEvents: true,
				backbone: false,
				apiEndpoint: '/ac/inline?q=',
				type: 'POST',
				searchResultsClass: ".search-results-wrapper"
			});

		},

		// ---------------------
		//= UTILITY METHODS
		// ---------------------
		cleanup: function() {
		  $(this.el).remove();
		}

	});

	return Application.Project.ListController;
})