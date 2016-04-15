var db = require("../../../lib/database.js");
var User = require("../../models/user.js");

module.exports = function(app){

	app.get('/user/profile', function(req, res, next){
		
		if(req.session.user){
			res.locals.user =  req.session.user || null;
			res.redirect("/");
		}else{
			res.render('users/login', {title:'Login'});	
		}
		
	});

	app.post("/user/profile", function(req, res, next){

		var username = req.body.username;	
		var password = req.body.password;
		new User().login( username, password, function( rows ){		
			if(rows.length > 0 && rows[0].id > 0 ){			
				var user = new User();
				user.id = rows[0].id;
				user.username = rows[0].username;			
				user.email = rows[0].email;
				user.level = rows[0].level;
				req.session.user = user;			
				res.redirect("/");
			}else{
				console.log("Login failed!." );	
				res.redirect("/login");					
			}
		});			
	});
}