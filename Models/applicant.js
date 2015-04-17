var mongoose = require('mongoose'); 
var ApplicantSchema = mongoose.Schema({
	firstname: 		{ type: String},
	lastname: 		{ type: String},
	username: 		{ type: String},
	password: 		{ type: String},
	mobileNumber: 	{ type: Number},
	verifyCode:   	{ type: Number}
});
module.exports = mongoose.model('Applicant',ApplicantSchema);
