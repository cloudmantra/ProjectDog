var mongoose = require('mongoose');
var UserTaskSchema = mongoose.Schema({
	type: 		{ type: String},
	taskId: 	{ type: String},
	taskName: 	{ type: String},
});
module.exports = mongoose.model('Usertask',UserTaskSchema);
