var express = require("express");
var db = require("../../../lib/database.js");
var router = express.Router();
var User = require("../../../models/user.js");

router.get('/', function(req, res, next){	
	if(req.session.user){
		res.locals.user =  req.session.user || null;
		res.redirect("/");
	}else{
		var returnUrl 	  = req.session.admin_return_url;
		var messageAccess = req.session.admin_message_access;
		delete req.session.admin_return_url;
		delete req.session.admin_message_access;
		console.log(returnUrl);
		if(returnUrl)
			res.locals.returnUrl = returnUrl;
		if( messageAccess )		 
			res.locals.messageAccess = messageAccess;
		res.render('client/users/login', {title:'Login'});	
	}
	
});

router.post("/", function(req, res, next){

	var username = req.body.username;	
	var password = req.body.password;
	var returnUrl = req.body.return_url;
	new User().login( username, password, function( rows ){		
		if(rows.length > 0 && rows[0].id > 0 ){			
			var user = new User();
			user.id = rows[0].id;
			user.username = rows[0].username;			
			user.email = rows[0].email;
			user.level = rows[0].level;			
			req.session.user = user;
			if(returnUrl)
				res.redirect(returnUrl);
			else
				res.redirect("/");
		}else{			
			res.redirect("user/login");					
		}
	});	
	
});

module.exports = router;
