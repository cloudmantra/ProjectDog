var mongoose = require('mongoose'); 
var UserDocSchema = mongoose.Schema({
	username:       { type: String},
	documentName: 	{ type: String},
	issueAuthority: { type: String},
	issueYear:     	{ type: Number},
	documentPath: 	{ type: String}
});
module.exports = mongoose.model('UserDocument',UserDocSchema);
