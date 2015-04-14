define([
	'underscore',
	'backbone'
],function(_,Backbone){

	var AppUserProfile=Backbone.Model.extend({
		idAttribute:"_id",
		url: '/api/userProfile',
		defaults: {
		   personalInfo:{
		      salutation:"",
		      gender:"",
		      dateOfBirth:"1990-01-01T18:30:00.000Z",
		      maritalStatus:"",
		      nameChanged:"",
		      firstName:"",
		      middleName:"",
		      lastName:"",
		      beforeMarriage:"",
		      fatherFirstName:"",
		      fatherMiddleName:"",
		      fatherLastName:"",
		      motherFirstName:"",
		      motherMiddleName:"",
		      motherLastName:""
		   },
		   addressInfo:{
		      temporaryAddress:{
		         addressLine1:"",
		         addressLine2:"",
		         addressLine3:"",
		         country:"",
		         state:"",
		         postalCode:"",
		         city:""
		      },
		      permenentAddress:{
		         addressLine1:"",
		         addressLine2:"",
		         addressLine3:"",
		         country:"",
		         state:"",
		         postalCode:"",
		         city:""
		      }
		   },
		   contactInfo:{
		      primaryEmail:"",
		      alternateEmail:"",
		      mobileNumber:0,
		      workNumber:0,
		      homeNumber:0,
		      preferredNumber:[]
		   },
		   passportInfo:{
		      idNumber:0,
		      issueDate:"2000-01-01T18:30:00.000Z",
		      expiryDate:"2000-01-01T18:30:00.000Z",
		      issueCountry:"",
		      issueCity:""
		   },
		   drivingLicenseInfo:{
		      idNumber:0,
		      issueDate:"2000-01-01T18:30:00.000Z",
		      expiryDate:"2000-01-01T18:30:00.000Z",
		      issueCountry:"",
		      issueCity:""
		   },
		   otherIds:[]
		}
	});
	return AppUserProfile;
});
