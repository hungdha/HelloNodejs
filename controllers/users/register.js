var express = require("express");
var db = require("../../lib/database");
var router = express.Router();
var User = require("../../models/user");

//var session = require("express-session").Session;
router.get('/', function(req, res, next){	
	if(req.session.user  != null)
		res.redirect("/");
	else
		res.render('users/register', {title:'Login'});
});

router.post("/", function(req, res, next){

	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	user.level = 1;

	user.save( function(err, rows ){
		if(err) throw err;	
		if( rows.insertId > 0 ){									
			res.redirect("/");
		}else{
			console.log("Register failed!." );	
			res.redirect("user/register");					
		}
	});	
	
});

module.exports = router;