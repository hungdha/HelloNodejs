var express = require("express");
var db = require("../../../lib/database");
var router = express.Router();
var User = require("../../../models/user");

// Phuong thuoc GET
router.get('/', function(req, res, next){

	if( req.session.user  != null ){
		// su dung Session 1 lan de show messsage
		// gan message cho bien err,msg
		var err = req.session.error; 
		var msg = req.session.success;

		// xoa session 
		delete req.session.error;
		delete req.session.success;
		res.locals.message = '';
		
		// kiem tra session, sau do gan vao bien res.locals.message
		if (err) res.locals.message = '<p class="msg bg-danger">' + err + '</p>';
		if (msg) res.locals.message = '<p class="msg bg-success">' + msg + '</p>';		

		// lay data cua user
		new User().get( req.session.user.id, function( user ){			
			res.render('client/users/edit', {title:'Edit User', user: user } );
		});		
	}else{
		// Neu chua login thi chuyen huong ve trang Home
		res.redirect("/");
	}		
});

// Phuong thuc POST cho Page Edit User
router.post("/", function(req, res, next){
	
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
				req.session.success = 'Save successfully !';
			else
				req.session.error = 'Save failed!';
			res.redirect("/user/edit");
		});			
	}
});

module.exports = router;