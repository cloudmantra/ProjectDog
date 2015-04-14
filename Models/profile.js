var mongoose = require('mongoose'); 
var ProfileSchema = mongoose.Schema({
	username: 		{ type: String},
	personalInfo:{
		salutation: 		{ type: String },
		gender: 			{ type: String },
		dateOfBirth: 		{ type: String },
		maritalStatus:  	{ type: String },
		nameChanged: 		{ type: Boolean },
		firstName: 			{ type: String },
		middleName:			{ type: String },
		lastName: 			{ type: String },
		beforeMarriage:		{ type: String },
		fatherFirstName: 	{ type: String },
		fatherMiddleName: 	{ type: String },
		fatherLastName: 	{ type: String },
		motherFirstName: 	{ type: String },
		motherMiddleName: 	{ type: String },
		motherLastName: 	{ type: String },
	},
	addressInfo:{
		temporaryAddress:{
			addressLine1: 		{ type: String },
			addressLine2: 		{ type: String },
			addressLine3: 		{ type: String },
			country: 	 		{ type: String },
			state: 				{ type: String },
			postalCode:			{ type: String },
			city: 				{ type: String }
		},
		permenentAddress:{
			addressLine1: 		{ type: String },
			addressLine2: 		{ type: String },
			addressLine3: 		{ type: String },
			country: 	 		{ type: String },
			state: 				{ type: String },
			postalCode:			{ type: String },
			city: 				{ type: String }	
		}
	},
	contactInfo:{
		primaryEmail: 		{ type: String },
		alternateEmail: 	{ type: String },
		mobileNumber: 		{ type: String },
		workNumber: 		{ type: String },
		homeNumber: 		{ type: String },
		preferredNumber: 	{ type: Array }
	},
	passportInfo:{
		idNumber: 		{ type: Number },
		issueDate:  	{ type: String },
		expiryDate: 	{ type: String },
		issueCountry: 	{ type: String },
		issueCity: 		{ type: String }
	},
	drivingLicenseInfo:{
		idNumber: 		{ type: Number },
		issueDate:  	{ type: String },
		expiryDate: 	{ type: String },
		issueCountry: 	{ type: String },
		issueCity: 		{ type: String }		
	},
	otherIds:[{
		idName: 		{ type: String },
		idNumber: 		{ type: Number },
		issueDate:  	{ type: String },
		expiryDate: 	{ type: String },
		issueCountry: 	{ type: String },
		issueCity: 		{ type: String }
	}]

});
module.exports = mongoose.model('Profile',ProfileSchema);
