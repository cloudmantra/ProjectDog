define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/desktopTemplates/homePageView.html'
], function($, _, Backbone, homePageTemplate){
  var HomePageView = Backbone.View.extend({
    el:".middleContainer",
    initialize: function (){},
    render: function(){
      this.$el.html(_.template(homePageTemplate, {}));
    },
    events:{
    }
  });
  return HomePageView;
});
