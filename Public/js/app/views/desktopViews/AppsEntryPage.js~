define([
  'jquery',
  'underscore',
  'backbone',
  'models/Session',
  'views/desktopViews/HomePageView',
  'views/desktopViews/AboutUsView',
  'views/desktopViews/ContactsView',
  'views/desktopViews/ServicesView',
  'views/desktopViews/AppsLoginPage',
  'views/desktopViews/AppsSignupPage',
  'views/desktopViews/AppsMainPage',
  'text!templates/desktopTemplates/appsEntryView.html'
], function($, _, Backbone, Session, HomePageView, AboutUsView, ContactsView, ServicesView, LoginPageView, SignupPageView, AppsMainPageView, appsEntryTemplate){
  var AppsEntryView = Backbone.View.extend({
    el: $('body'),
    initialize: function (){
      _.bindAll(this, 'detect_scroll');
      $(window).scroll(this.detect_scroll);
    },
    render: function(){
       this.session  = new Session();
       var that = this;
       this.session.fetch({ success: function(data){
                      that.$el.html(_.template( appsEntryTemplate, {})); 
                      $(".wrapper").html(new AppsMainPageView().render()); 
                      $(".header").addClass("float-header");
                    }
                  , error: function(err){
                      that.$el.html(_.template( appsEntryTemplate, {})); 
                      $(".middleContainer").html(new HomePageView().render());
                    }
                  });
    },
    events:{
      'scroll .wrapper' : 'detect_scroll',
      'click  .go-top'  : 'fnGoTop',
      'click  .menu li' : 'fnShowPage',
      'click .loginLink': 'goToLoginPage',
      'click .signupLink': 'goToSignUpPage'
    },
    detect_scroll: function(e){
      var curr_pos = $("body").innerHeight() - window.pageYOffset;
      if(window.pageYOffset == 0 && window.pageXOffset == 0){
        if($(".middleContainer").children("div").hasClass("parallax")){
          $(".header").removeClass("float-header");
        }
        $(".top").css("display","block");
        $(".header").css("top","40px");
        $(".go-top").removeClass("show");
      }else if(curr_pos == window.innerHeight){
        $(".go-top").addClass("show");
      }else{
        $(".go-top").removeClass("show");
        $(".header").addClass("float-header");
        $(".top").css("display","none");
        $(".header").css("top","0%");
      }
    },
    fnGoTop: function(e){
        window.scroll(0, 0);
        setTimeout(function() {
          if($(".middleContainer").children("div").hasClass("parallax")){
            $(e.target).parent("a").siblings(".header").removeClass("float-header");
          }
          $(e.target).parent("a").siblings(".top").css("display","block");
          $(e.target).parent("a").siblings(".header").css("top","40px");
          $(e.target).parent("a").removeClass("show");
        },100);
    },
    fnShowPage:function (e) {
      $(".menu li a").removeClass("active");
      if($(e.target).hasClass("aboutUsLink")){
          $(".header").addClass("float-header");
          $(e.target).addClass("active");
          $(".middleContainer").html(new AboutUsView().render());
          window.scroll(0, 0);
      }else if($(e.target).hasClass("servicesLink")){
          $(".header").addClass("float-header");
          $(e.target).addClass("active");
          $(".middleContainer").html(new ServicesView().render());
          window.scroll(0, 0);
      }else if($(e.target).hasClass("contactsLink")){
          $(".header").addClass("float-header");
          $(e.target).addClass("active");
          $(".middleContainer").html(new ContactsView().render());
          window.scroll(0, 0);
      }else if($(e.target).hasClass("homeLink")){ 
          $(".header").removeClass("float-header");
          $(e.target).addClass("active");
          $(".middleContainer").html(new HomePageView().render());
          window.scroll(0, 0);
      }
    },
    goToLoginPage:function(){
          $(".header").addClass("float-header");
	  $(".homeLink").removeClass("active");
          $(".middleContainer").html(new LoginPageView().render());
          window.scroll(0, 0);
    },
    goToSignUpPage:function(){
          $(".header").addClass("float-header");
          $(".homeLink").removeClass("active");
          $(".middleContainer").html(new SignupPageView().render());
          window.scroll(0, 0);
    }
  });
  return AppsEntryView;
});
