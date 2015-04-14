define([
  'underscore',
  'backbone'
], function(_, Backbone){
   var Session = Backbone.Model.extend({
   url: '/api/session'
   });
   return Session;
});

