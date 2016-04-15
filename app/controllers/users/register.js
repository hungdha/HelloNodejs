
var User = require("../../models/user");
module.exports  = function(app){
	app.get('/user/register', function(req, res, next){	
		if(req.session.user  != null)
			res.redirect("/");
		else
			res.render('users/register', {title:'Login'});
	});

	app.post("/user/register", function(req, res, next){

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
}
