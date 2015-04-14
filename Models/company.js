var mongoose = require('mongoose');
var CompanySchema = mongoose.Schema({
	firstName: 		{ type: String},
	lastName: 		{ type: String},
	companyName: 	{ type: String},
	department: 	{ type: String},
	designation: 	{ type: String},
	companyEmail: 	{ type: String},
	mobileNumber: 	{ type: Number},
	workNumber: 	{ type: Number},
	verifyCode:   	{ type: Number}
});
module.exports = mongoose.model('Company',CompanySchema);