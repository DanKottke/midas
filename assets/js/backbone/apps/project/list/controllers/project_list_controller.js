define([
	'jquery',
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
	'project_edit_form_view'
], function (
	$, _, Backbone, Bootstrap, Utilities, BaseController,
	ProjectsCollection, ProjectsCollectionView, ProjectShowController, 
	ProjectFormView, ProjectApp, ModalComponent, ProjectEditFormView) {
	
	Application.Project.ListController = BaseController.extend({

		el: "#container",

		events: {
			"click .project"				: "show",
			"click .add-project"		: "add",
			"click .edit-project"		: "edit",
			"click .delete-project"	: "delete"
		},

		initialize: function () {
			var self = this;
			this.fireUpProjectsCollection();
			this.bindToProjectFetchListeners();
			this.collection.trigger("projects:fetch");

			this.listenTo(this.collection, "project:save:success", function () {
				window.location.reload()
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
			if (this.projectCollectionView)
				$("#container").children().remove();

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
          el: ".modal-template",
          collection: self.collection
        }).render();  
      }

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