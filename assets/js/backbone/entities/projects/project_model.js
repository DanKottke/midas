define([
  'underscore',
  'backbone',
], function (_, Backbone) {
  
  var ProjectModel = Backbone.Model.extend({

    defaults: {
      title       : null,
      description : null,
      archived    : false
    },

    // Initialize contains only event bindings and if/then response
    // functions (class methods).
    initialize: function () {
      var self = this;

      this.listenTo(this, "project:model:fetch", function (id) {
        self.get(id);
      });

      this.listenTo(this, "project:model:update", function (data) {
        self.update(data);
      });

      this.listenTo(this, "project:update:photoId", function (file) {
        self.updatePhoto(file);
      });

      this.listenTo(this, "project:update:state", function (state) {
        self.updateState(state);
      });
    },

    urlRoot: '/project',
    
    get: function (id) {
      var self = this;

      this.fetch({ id: id,
        success: function (data) {
          self.trigger("project:model:fetch:success", data);
        }
      })
    },

    update: function (data) {
      var self = this;

      this.save({ 
        title: data['title'],
        description: data['description']
      }, { success: function (returnModel) {
          self.trigger("project:save:success");
        }
      });
    },

    // TODO: Update this method and move it into the global update method.
    updatePhoto: function (file) {
      var self = this;

      this.save({
        coverId: file['id']
      }, {
        success: function (data) {
          self.trigger("project:updated:photo:success", data);
        }
      });
    },

    updateState: function (state) {
      var self = this;

      this.save({
        state: state
      }, {
        success: function(data) {
          self.trigger("project:update:state:success", data);
        }
      });
    }

  });

  return ProjectModel;
});