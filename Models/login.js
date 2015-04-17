var mongoose = require('mongoose'); 
var LoginSchema = mongoose.Schema({
	firstname:{ type: String},
	lastname: { type: String},
	username: { type: String},
	password: { type: String},
	type:     { type: String}
});
module.exports = mongoose.model('Login',LoginSchema);
