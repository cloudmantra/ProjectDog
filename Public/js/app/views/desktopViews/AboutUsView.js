define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/desktopTemplates/aboutPageView.html'
], function($, _, Backbone, aboutPageTemplate){
  var AboutUsView = Backbone.View.extend({
    el:".middleContainer",
    initialize: function (){
      _.bindAll(this, 'detect_scroll');
      $(window).scroll(this.detect_scroll);
    },
    render: function(){
      this.$el.html(_.template(aboutPageTemplate, {}));
    },
    events:{
      'scroll .row':'detect_scroll',
    },
    detect_scroll:function(e){
      if(window.pageYOffset > 550){
        $('.progress-bar').each(function() {
            var percent = $(this).data('percent');
            $(this).find('.progress-animate').animate({
               "width": percent + '%'
            },3000);

            $(this).parent('.progress-single').find('.perc').addClass('show').animate({
               "width": percent + '%'
            },3000);
         });
      }
    }
  });
  return AboutUsView;
});
