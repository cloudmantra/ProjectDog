define([
	'underscore',
	'backbone'
],function(_,Backbone){

	var AppUserFile=Backbone.Model.extend({
		idAttribute:"_id"
	});
	return AppUserFile;
});