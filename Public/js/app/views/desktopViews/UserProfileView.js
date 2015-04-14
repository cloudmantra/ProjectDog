define([
  'jquery',
  'underscore',
  'backbone',
  'models/UserProfile',
  'text!templates/desktopTemplates/userProfileView.html',
  'text!templates/desktopTemplates/userProfileOtherID.html'
], function($, _, Backbone, UserProfile, userProfileTemplate, userOtherIdTemplate){
  var UserProfileView = Backbone.View.extend({
    el:".mainContentContainer",
    initialize: function (){},
    render: function(){
      var that = this;
      var profile = new UserProfile();
      profile.fetch({success:function(data){
          console.log(data);
          if(data.attributes.data != null){
            that.$el.html(_.template( userProfileTemplate, {data:data.attributes.data}));
          }else{
            that.$el.html(_.template( userProfileTemplate, { data:data.attributes }));
          }
          if(data.attributes.data != null){
                that.fillUpData(data.attributes.data);
          }

      }});
    },
    events:{
      'click .SaveProfileBtn' : 'fnUpdateProfile'
    },
    fillUpData:function(data){
      
      var salutation = data.personalInfo.salutation;
      $('#salutaion option:[value="'+salutation+'"]').prop('selected', true);
      
      var gender = data.personalInfo.gender;
      $('#gender option:[value="'+gender+'"]').prop('selected', true);
      
      var maritalStatus = data.personalInfo.maritalStatus;
      $('#maritalStatus option:[value="'+maritalStatus+'"]').prop('selected', true);
      
      var nameChanged = data.personalInfo.nameChanged;
      $('#nameChange').prop('checked', nameChanged);

      var temporaryCountry = data.addressInfo.temporaryAddress.country;
      $('#tempAddressCountry option:[value="'+temporaryCountry+'"]').prop('selected', true);
      
      var temporaryState = data.addressInfo.temporaryAddress.state; 
      $('#tempAddressState option:[value="'+temporaryState+'"]').prop('selected', true);     
      
      var permenentCountry = data.addressInfo.permenentAddress.country;
      $('#permenentAddressCountry option:[value="'+permenentCountry+'"]').prop('selected', true);
      
      var permenentState = data.addressInfo.permenentAddress.state;
      $('#permenentAddressState option:[value="'+permenentState+'"]').prop('selected', true);
      
      var preferredContacts = data.contactInfo.preferredNumber;
      preferredContacts.forEach(function(item){
        $('input[value='+item+']').prop("checked", true);
      });
      
      var passportIssueCountry = data.passportInfo.issueCountry;
      $('#passportIssueCountry option:[value="'+passportIssueCountry+'"]').prop('selected', true);
      
      var dlIssueCountry = data.drivingLicenseInfo.issueCountry;
      $('#drivingLicenseIssueCountry option:[value="'+dlIssueCountry+'"]').prop('selected', true);
      
      $(".userIdContainer").append(_.template(userOtherIdTemplate, {data:data.otherIds}));
      
    },
    fnUpdateProfile:function(e){
      if($("#readTermsCondition").is(':checked')){
          var tempPreferenceArray = new Array();
          
          $.each($("input[name='contactPref']:checked"), function(){ 
              tempPreferenceArray.push($(this).val());
          });

          var dateofBirth, passportIssueDate ,passportExpiryDate, dlIssueDate, dlExpiryDate;
          if($("#dateofBirth").val() == "" || $("#dateofBirth").val() == null || $("#dateofBirth").val() == undefined){
              dateofBirth = new Date(2001,0,1).toISOString();
          }else{
              dateofBirth = new Date($("#dateofBirth").val()).toISOString()
          }

          if($("#passportDateOfIssue").val() == "" || $("#passportDateOfIssue").val() == null || $("#passportDateOfIssue").val() == undefined){
              passportIssueDate = new Date(2001,0,1).toISOString();
          }else{
              passportIssueDate = new Date($("#passportDateOfIssue").val()).toISOString()
          }

          if($("#passportExpiryDate").val() == "" || $("#passportExpiryDate").val() == null || $("#passportExpiryDate").val() == undefined){
              passportExpiryDate = new Date(2001,0,1).toISOString();
          }else{
              passportExpiryDate = new Date($("#passportExpiryDate").val()).toISOString()
          }

          if($("#dlDateOfIssue").val() == "" || $("#dlDateOfIssue").val() == null || $("#dlDateOfIssue").val() == undefined){
              dlIssueDate = new Date(2001,0,1).toISOString();
          }else{
              dlIssueDate = new Date($("#dlDateOfIssue").val()).toISOString()
          }

          if($("#dlExpiryDate").val() == "" || $("#dlExpiryDate").val() == null || $("#dlExpiryDate").val() == undefined){
              dlExpiryDate = new Date(2001,0,1).toISOString();
          }else{
              dlExpiryDate = new Date($("#dlExpiryDate").val()).toISOString()
          }
          
          var obj = {
             "personalInfo":{
                "salutation": $("select#salutaion option:selected").val(),
                "gender": $("select#gender option:selected").val(),
                "dateOfBirth":dateofBirth,
                "maritalStatus":$("select#maritalStatus option:selected").val(),
                "nameChanged": $("#nameChange").is(':checked'),
                "firstName": $("#firstName").val(),
                "middleName": $("#middleName").val(),
                "lastName":$("#lastName").val(),
                "beforeMarriage": $("#beforeMarriageName").val(),
                "fatherFirstName":$("#fatherFirstName").val(),
                "fatherMiddleName":$("#fatherMiddleName").val(),
                "fatherLastName":$("#fatherLastName").val(),
                "motherFirstName":$("#motherFirstName").val(),
                "motherMiddleName":$("#motherMiddleName").val(),
                "motherLastName":$("#motherLastName").val()
             },
             "addressInfo":{
                "temporaryAddress":{
                   "addressLine1":$("#tempAddressLine1").val(),
                   "addressLine2":$("#tempAddressLine2").val(),
                   "addressLine3":$("#tempAddressLine3").val(),
                   "country":$("select#tempAddressCountry option:selected").val(),
                   "state":$("select#tempAddressState option:selected").val(),
                   "postalCode":$("#tempAddressPostalCode").val(),
                   "city":$("#tempAddressCity").val()
                },
                "permenentAddress":{
                   "addressLine1":$("#permenentAddressLine1").val(),
                   "addressLine2":$("#permenentAddressLine2").val(),
                   "addressLine3":$("#permenentAddressLine3").val(),
                   "country":$("select#permenentAddressCountry option:selected").val(),
                   "state":$("select#permenentAddressState option:selected").val(),
                   "postalCode":$("#permenentAddressPostalCode").val(),
                   "city":$("#permenentAddressCity").val()
                }
             },
             "contactInfo":{
                "primaryEmail":$("#primaryEmail").val(),
                "alternateEmail":$("#alternateEmail").val(),
                "mobileNumber":parseInt($("#mobileNumber").val()),
                "workNumber":parseInt($("#workNumber").val()),
                "homeNumber":parseInt($("#homeNumber").val()),
                "preferredNumber":tempPreferenceArray
             },
             "passportInfo":{
                "idNumber":parseInt($("#passportNumber").val()),
                "issueDate":passportIssueDate,
                "expiryDate":passportExpiryDate,
                "issueCountry":$("select#passportIssueCountry option:selected").val(),
                "issueCity":$("#passportIssueCity").val()
             },
             "drivingLicenseInfo":{
                "idNumber":parseInt($("#drivingLicenseNumber").val()),
                "issueDate": dlIssueDate,
                "expiryDate": dlExpiryDate,
                "issueCountry":$("select#drivingLicenseIssueCountry option:selected").val(),
                "issueCity":$("#dlIssueCity").val()
             },
             "otherIds":[
                {
                   "idName":"Aadhar",
                   "idNumber":14256451278,
                   "issueDate":"2005-05-13T18:30:00.000Z",
                   "expiryDate":"2085-05-13T18:30:00.000Z",
                   "issueCountry":"india",
                   "issueCity":"Udgir"
                }
             ]
          }
          $.ajax({
             type: "PUT",
             url:  'api/userProfile',
             dataType: 'json',
             data: obj,
             success: function(res) {
                alert("Profile updated successfully.")
             }
          });
      }
    }
  });
  return UserProfileView;
});
