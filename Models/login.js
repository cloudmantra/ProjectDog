var mongoose = require('mongoose'); 
var LoginSchema = mongoose.Schema({
	username: { type: String},
	password: { type: String},
	type:     { type: String}
});
module.exports = mongoose.model('Login',LoginSchema);
