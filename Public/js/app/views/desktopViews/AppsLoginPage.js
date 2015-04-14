define([
  'jquery',
  'underscore',
  'backbone',
  'models/Login',
  'views/desktopViews/AppsMainPage',
  'text!templates/desktopTemplates/appLoginPage.html'
], function($, _, Backbone, Login, AppsMainPageView, appLoginTemplate){
  var AppsLoginView = Backbone.View.extend({
    el:".middleContainer",
    initialize: function (){},
    render: function(){
      this.login    = new Login();
      this.$el.html(_.template( appLoginTemplate, {}));
    },
    events:{
      'click #loginBtn' : 'submitLogin'
    },
    submitLogin:function (e) {
      var that = this;
      username = $("#email").val();
      password = $("#password").val();

      this.login.save({'username': username,'password': password}
                     ,{ success: function(data) {
                            that.$el.html(new AppsMainPageView().render());
                            $(".header").addClass("float-header");
                            window.scroll(0, 0);
                          }
                      });
    }
  });
  return AppsLoginView;
});
