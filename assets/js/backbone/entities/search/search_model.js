define([
  'underscore',
  'backbone'
], function (_, Backbone) {

  var SearchModel = Backbone.Model.extend({

    urlRoot: '/ac/inline?q='

  });

  return SearchModel;
})