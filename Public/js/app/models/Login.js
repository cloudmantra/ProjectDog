define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var Login = Backbone.Model.extend({
     url: '/api/login'
   });
  
   return Login;
  
});

