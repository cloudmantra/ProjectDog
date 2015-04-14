var mongoose = require('mongoose'); 
var ApplicantSchema = mongoose.Schema({
	username: 		{ type: String},
	password: 		{ type: String},
	mobileNumber: 	{ type: Number},
	verifyCode:   	{ type: Number}
});
module.exports = mongoose.model('Applicant',ApplicantSchema);
