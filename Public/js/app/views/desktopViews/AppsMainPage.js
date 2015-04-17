define([
  'jquery',
  'underscore',
  'backbone',
  'models/Logout',
  'views/desktopViews/UserProfileView',
  'views/desktopViews/UserDocumentsView',
  'views/desktopViews/UserVouchView',
  'text!templates/desktopTemplates/appsMainPageView.html'
], function($, _, Backbone, Logout, UserProfileView, UserDocumentsView, UserVouchView, appMainPageTemplate){
  var AppsMainPageView = Backbone.View.extend({
    el:"body",
    initialize: function (){},
    logout: new Logout(),
    render: function(basicInfo){
      if(basicInfo === undefined || basicInfo === null){}else{
        localStorage.setItem("firstname",basicInfo.firstName);
        localStorage.setItem("lastname",basicInfo.lastName);
      }
      this.fullName = localStorage.getItem("firstname") +" "+ localStorage.getItem("lastname");
      var that = this;
      $.ajax({
         type: "GET",
         url:  'api/userTaskList',
         dataType: 'json',
         success: function(doc) {
            that.$el.html(_.template( appMainPageTemplate, {data:doc,fullName: that.fullName})); 
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
      $(".mainContentContainer").html(new UserVouchView().render());
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