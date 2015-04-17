var express = require('express');
var mongoose = require('mongoose');
var busboy = require('connect-busboy'); 
var bodyParser = require("body-parser");
var session = require('express-session');
var app = express();

app.use(session({ resave: true,
            saveUninitialized: true,
            secret: 'ovuchodg' }));

app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var config = require('./Config/config.json')[process.env.NODE_ENV || 'development'];

mongoose.connect(config.MONGO_URI,function(err){
	if(!err){console.log('connection successful');}else{console.log(err)}
});

var routes = require('./Routes/routes')

app.use('/api', routes);

app.use(express.static(__dirname + '/Public', { redirect : true })); 
app.listen(config.PORT_NO);
console.log('Listening on port...'+config.PORT_NO);
