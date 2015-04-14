define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var Logout = Backbone.Model.extend({
     url: '/api/logout'
   });
  
   return Logout;
  
});

