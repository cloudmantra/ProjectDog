define([
	'underscore',
	'backbone',
	'models/UserFile', 
    	'restApiServer'
],function(_,Backbone,UserFileModel,restApiServer){
	var UserFiles =Backbone.Collection.extend({
		model: UserFileModel,
		url: restApiServer.ReSTFulAPIHost + '/api/uploadDocument'	
	});
	return UserFiles;
});
