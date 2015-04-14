define([
  'jquery',
  'underscore',
  'backbone',
  'models/Logout',
  'views/desktopViews/UserProfileView',
  'views/desktopViews/UserDocumentsView',
  'text!templates/desktopTemplates/appsMainPageView.html'
], function($, _, Backbone, Logout, UserProfileView, UserDocumentsView, appMainPageTemplate){
  var AppsMainPageView = Backbone.View.extend({
    el:".wrapper",
    initialize: function (){},
    logout: new Logout(),
    render: function(){
      var that = this;
      $.ajax({
         type: "GET",
         url:  'api/userTaskList',
         dataType: 'json',
         success: function(doc) {
            that.$el.html(_.template( appMainPageTemplate, {data:doc})); 
            $(".header").addClass("float-header");
            window.scroll(0, 0);
         },
         error:function(err){
            console.log("invalid Credential");
         }
      });
    },
    events:{
      'click .logoutLink': 'fnLogout',
      'click .interactions':'fnShowInteractions',
      'click .verifications':'fnShowVerifications',
      'click .vouches' :'fnShowVouches',
      'click .documents':'fnShowDocuments',
      'click .profile':'fnShowProfile',
      'click .btn-menu' :'fnShowMenuList'
      
    },
    fnLogout:function(e){
      this.logout.fetch({success: function(data){
         window.location.reload();
      }});
    },
    fnShowProfile: function(e){
      $(".mainContentContainer").html(new UserProfileView().render());
    },
    fnShowDocuments: function(e){
      $(".mainContentContainer").html(new UserDocumentsView().render());
    },
    fnShowVouches: function(e){
      $(".mainContentContainer").html("Vouches View");
    },
    fnShowVerifications: function(e){
      $(".mainContentContainer").html("Verifications View");
    },
    fnShowInteractions: function(e){
      $(".mainContentContainer").html("Interactions View");
    },

    fnShowMenuList: function (e){
      $("#mainnav").toggle();
    }

  });
  return AppsMainPageView;
});