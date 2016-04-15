

var db = require("../../../lib/database");
var User = require("../../models/user");


module.exports = function(app){
	app.get('/', function(req, res, next){
		if( req.session.user  != null ){		
			new User().get( req.session.user.id, function( user ){			
				res.render('users/edit', {title:'Edit User', user: user } );
			});		
		}else{
			res.redirect("/");
		}		
	});

	app.post("/", function(req, res, next){
		
		if( req.session.user  != null ){		
			var user = new User();					
			user.id = +req.session.user.id;								
			user.password = req.body.password;			
			user.email = req.body.email;			
			user.first_name = req.body.first_name;			
			user.last_name = req.body.last_name;		
			user.save( function(err, rows ){
				if(err)
					throw err;					
				if( rows.affectedRows > 0 )					
					res.locals.message = {"info" : "Save successfully !"};
				else
					res.locals.message = {"info" : "Save failed!"};											
				res.redirect("/user/edit");
			});			
		}
	});
}

//module.exports = router;