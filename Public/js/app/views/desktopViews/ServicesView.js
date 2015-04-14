define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/desktopTemplates/servicesPageView.html'
], function($, _, Backbone, servicesPageTemplate){
  var AppsServicesView = Backbone.View.extend({
    el:".middleContainer",
    initialize: function (){},
    render: function(){
      this.$el.html(_.template(servicesPageTemplate, {}));
    },
    events:{
    }
  });
  return AppsServicesView;
});
