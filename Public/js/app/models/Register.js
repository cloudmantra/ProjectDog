define([
  'underscore',
  'backbone'
], function(_, Backbone){
   var Register = Backbone.Model.extend({
     url: '/registerUser'
   });
   return Register;
});
