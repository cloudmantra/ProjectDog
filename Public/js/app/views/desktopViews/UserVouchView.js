define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/desktopTemplates/userVouchView.html'
], function($, _, Backbone, userVouchTemplate){
  var UserDocumentsView = Backbone.View.extend({
    el:".mainContentContainer",
    initialize: function (){},
    render: function(){
      var that = this;
      this.$el.html(_.template( userVouchTemplate, {}));
    },
    events:{
    }
  });
  return UserDocumentsView;
});
