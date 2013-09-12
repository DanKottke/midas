define([
  'underscore',
  'backbone',
  'text!search_result_item_template'
], function (_, Backbone, SearchResultTemplate) {

  var SearchResultItemView = Backbone.View.extend({

    initialize: function () {
      this.render();
    },

    render: function () {
      if (this.$el.children().length > 5) {
        this.$el.children().remove()
      }
      
      for (var i in this.model.attributes) {
        var tmpl = _.template(SearchResultTemplate, this.model.attributes[i])  
        this.$el.append(tmpl)
      }
          
    }

  });

  return SearchResultItemView;
})