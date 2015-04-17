var express = require('express');
var nodemailer = require("nodemailer");
var fs = require('fs');
var path  = require('path');
var router = express.Router();
var LoginList = require('../Models/login');
var TaskList = require('../Models/usertask');
var CompanyList = require('../Models/company');
var ApplicantList = require('../Models/applicant');
var ProfileList = require('../Models/profile');
var UserDocList = require('../Models/userdocument');

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

router.route("/session")
    .get(function(req, res){
       //Check for authentication
	  if(req.session.user){
	      res.send(200, {
	          auth : true,
	          user : req.session.user
	      });
	  }else{
	      res.send(200, {
	          auth : false
	      });
	  }
	})


/*var smtpTransport = nodemailer.createTransport("SMTP",
					{service: "Gmail",
					 auth: { user: "",pass: ""}
				});*/

router.route('/registerApplicant')
    .post(function(req, res) {
    	var tempCode = Math.floor(Math.random() * 90000) + 10000;
    	/*var mailOptions={
							to : req.body.username,
							subject : "Login Verification",
							html : "<div><span>Hi,</span><br/><p>Please use <b><u>"+tempCode+"</u></b> to verify your DOGVouch account</p>"+
								   "<br/><br/>Regards,<br/>DOGVouch Team.</div>"
						}
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
				res.end("error");
			}else{*/
				var Applicant = new ApplicantList();
		        Applicant.username = req.body.username;
		        Applicant.password = req.body.password;
		        Applicant.firstname = req.body.firstname;
		        Applicant.lastname = req.body.lastname;
		        Applicant.mobileNumber = parseInt(req.body.mobileNumber);
		        Applicant.verifyCode = parseInt(tempCode);
				ApplicantList.findOne({username:req.body.username},function(err, data){
					if(data == null|| data == undefined){
						Applicant.save(function(err) {
				            if (err){
				            	res.json({success:0});
								res.end();
				            }else{
				            	res.json({success:1});
								res.end();
				            }
				        })
					}else{
						data.verifyCode = tempCode;
						data.save();
				    	res.json({success:2});
						res.end();
					}
				});
			//}
		//});
})

router.route('/registerCompany')
    .post(function(req, res) {
    	var tempCode = Math.floor(Math.random() * 90000) + 10000;
    	/*var mailOptions={
							to : req.body.username,
							subject : "Login Verification",
							html : "<div><span>Hi Rajkumar</span><br/><p>Please use <b><u>"+tempCode+"</u></b> to verify your DOGVouch account</p>"+
								   "<br/><br/>Regards,<br/>DOGVouch Team.</div>"
						}
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
				res.end("error");
			}else{*/
				var Company = new CompanyList();
		        Company.firstName = req.body.firstName;Applicant.lastName = req.body.lastName;
		        Company.companyName = req.body.companyName;
		        Company.designation = req.body.designation;
		        Company.department = req.body.department;
		        Company.companyEmail = req.body.companyEmail;
		        Company.mobileNumber = parseInt(req.body.mobileNumber);
		        Company.workNumber = parseInt(req.body.workNumber);
		        Company.verifyCode = parseInt(tempCode);
				CompanyList.findOne({companyEmail:req.body.companyEmail},function(err, data){
					if(data == null|| data == undefined){
						Company.save(function(err) {
				            if (err){
				                res.send(err);
				            }else{
				            	res.json({success:"Please verify your account using code sent to your email"});
								res.end();
				            }
				        })
					}else{
						data.verifyCode = tempCode;
						data.save();
					}
				});
			//}
		//});
})

router.route('/verifyApplicant')
	.post(function(req, res) {
        ApplicantList.findOne({username:req.body.username},function(err, data){
			if (!err) { 
				verCode = data.verifyCode;
				user = data.username;
				pass = data.password;
				firstName = data.firstname;
				lastName = data.lastname;
				if(verCode == parseInt(req.body.verifyCode)){
					LoginList.findOne({username:data.username},function(err, data){
						if(data == null|| data == undefined){
							var doc = new LoginList();
							doc.username = user;
							doc.password = pass;
							doc.firstname = firstName;
							doc.lastname = lastName;
							doc.type = "person";
							doc.save(function(err){
								if (!err) {
									res.json({ success:1 });
								    res.end();
								};
							});
						}
					});
				}
			};
		});
	});

router.route('/verifyApplicant')
	.post(function(req, res) {
	    ApplicantList.findOne({username:req.body.username},function(err, data){
			if (!err) {
				if(data.verifyCode == parseInt(req.body.verifyCode)){
					LoginList.findOne({username:data.username},function(err, data){
						if(data == null|| data == undefined){
								var doc = new LoginList();
								doc.username = user;
								doc.password = pass;
								doc.type = "person";
								doc.save(function(err){
									if (!err) {
										res.json({ success: 'Applicant created!' });
									    res.end();	
									};
								});
						}
					});
				}
			};
		});
	});

router.route('/login')
 	.post(function(req,res){
        LoginList.findOne({username:req.body.username,password:req.body.password},function(err, data){
			if(data.length == 0 || data == null){
				res.json({success:false});
				res.end();
			}else{
				req.session.user = req.body.username;
          		res.send(200, {
              		auth : true,
              		firstName: data.firstname,
              		lastName: data.lastname
          		});
          		res.end();
			}
		});
})

router.route('/logout')
 	.get(function(req,res){
 		req.session.destroy(function(err) {});
  		res.end();
	})

router.route('/userTaskList')
 	.get(function(req,res){
 		var user = req.session.user;
        LoginList.findOne({username:user},function(err, data){
			if(data.length == 0 || data == null){
				res.json({success:false});
				res.end();
			}else{
				TaskList.find({type:data.type},function(err, data){
					res.json({username:user,TaskList:data});
					res.end();
				});
			}
		});
})

router.route('/userProfile')
 	.get(function(req,res){
 		var user = req.session.user;
        ProfileList.findOne({username:user},function(err, data){
			if(!err){
				res.json({data: data})
				res.end();
			}
		});
	})
 	.put(function(req,res){
 		var user = req.session.user;
	    var ProfileData = new Object(req.body);
	    ProfileList.findOne({username:user},function(err, data){
	    	if(data != null || data != undefined){
		 		ProfileList.update({username:user},ProfileData,{},function(err, data){
		 			if(!err){
		 				res.json({data:"Update Successfully"});
		 				res.end();
		 			}
		 		});
	    	}else{
	    		var Profile = new ProfileList();
	    		Profile.username = user;
	    		for (var key in ProfileData) {
				  if (ProfileData.hasOwnProperty(key)) {
			    	Profile[key] = ProfileData[key];
				  }
				}
				Profile.save(function(err) {
		            if (err){console.log(err)
		                res.send(err);
						res.end();
		            }else{
		            	res.json({success:"Please verify your account using code sent to your email"});
						res.end();
		            }
		        })
	    	}
 		})
 	})

 router.route('/uploadDocument')
 	.get(function(req,res){
 		var user = req.session.user;
 		UserDocList.find({username:user},function(err, data){
			if(!err){
				res.json({Documents: data})
				res.end();
			}
		});
	})
 	.post(function( req , res){
 		var user = req.session.user;
 		mkdirSync(path.join(__dirname + '/'+user));
 		var fileInfo= new Object();
 		if (req.busboy) {
		    req.pipe(req.busboy);
		    var UserDoc = new UserDocList();
			UserDoc.username = user;
		    req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
		      	if(key == "documentName"){
		      		UserDoc.documentName = value;	
		      	}else if(key == "issueAuthority"){
		      		UserDoc.issueAuthority = value;	
		      	}else if(key == "issueYear"){
		      		UserDoc.issueYear = value;
		      	}
		    });
		    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		    	fstream = fs.createWriteStream(__dirname + '/'+user+'/' + filename);
		        file.pipe(fstream);
		        fstream.on('close', function () {
		            res.redirect('back');
		            UserDoc.documentPath = filename;   
		            UserDocList.findOne({username:user,documentPath:UserDoc.documentPath},function(err, data){
						if(data == null|| data == undefined){
							UserDoc.save(function(err) {
				            	if (err){
				            		res.json({success:0});
									res.end();
				            	}else{
				            		res.json({success:1});
									res.end();
				            	}
				        	})
						}
					});
		       	});
		    });
		  }
	})

router.route('/downloadDocument')
	.get(function(req,res){
		var user = req.session.user;
		var file = req.query.file;
		var filePath = __dirname + '/'+user+'/' + file;
		res.download(filePath);
	})

router.route('/deleteDocument')
	.get(function(req,res){
		var user = req.session.user;
		var files = req.query.files;
		var UserDoc = new UserDocList();
		var filePath = "";
		files.forEach(function(filename) {console.log(user+ "   " +filename);
			UserDocList.findOne({username:user,documentPath:filename},function(err, data){
				if(data == null|| data == undefined){
					console.log(data);
					data.remove();
					filePath = __dirname + '/'+user+'/' + filename;
					fs.unlink(filePath,function(doc){ 
						res.json({success:true});
						res.end();
					});
				}
			});
		});
	})

module.exports = router;
