define([
  'jquery',
  'underscore',
  'backbone',
  'views/desktopViews/AppsLoginPage',
  'text!templates/desktopTemplates/appSignUpPage.html'
], function($, _, Backbone, AppsLoginView, appSignUpTemplate){
  var AppsSignupView = Backbone.View.extend({
    el:".middleContainer",
    initialize: function (){},
    render: function(){
      this.$el.html(_.template( appSignUpTemplate, {}));
    },
    events:{
      'click #saveApplicant'      : 'fnSaveApplicant',
      'click #submitApplicant'    : 'fnSubmitApplicant'
    },
    fnSaveApplicant:function(e){ 
      if($("#password").val() == $("#confirmPassword").val()){
        var data = new Object();
        data.username = $("#email").val();
        data.password = $("#password").val(); 
        data.mobileNumber = $("#mobileNumber").val();
        console.log(data);
        $.ajax({
           type: "POST",
           url:  "api/registerApplicant",
           dataType: 'json',
           data: data,
           success: function(doc) {
              if(doc.success == 1){
                $(".applicantVerifyForm").css("display","block");
              }else if(doc.success == 2){
                alert("User Already Exist");
              }
           },
        });
      }
    },
    fnSubmitApplicant:function(e){
      var that = this;
      var data = new Object();
      data.username = $("#email").val();
      data.verifyCode = $("#verifyCodeApplicant").val();
      console.log(data);
      $.ajax({
         type: "POST",
         url:  "api/verifyApplicant",
         dataType: 'json',
         data: data,
         success: function(doc) {
            that.$el.html(new AppsLoginView().render());
         },
      });
    }
  });
  return AppsSignupView;
});
