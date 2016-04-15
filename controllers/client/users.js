var db = require("../../lib/database");
var User = require("../../models/user");

var mapUserModels = function(user){
	if(typeof user == "object")
		return {
			'id' : user.id,
			'first_name' : user.first_name,
			'last_name' : user.last_name,
			'register_date' : user.register_date,
			'username' : user.username,
			'email' : user.email,
			'level' : user.level,
			'full_name' : user.fullName(),
			'role' : user.level == 2 ? "Admin" : "Register"
		}
	return {};
}

module.exports = {
	profile : function(req, res, next){	
		if(!req.params.username){
			req.params.username = req.session.user.username;
		}
		console.log(req.params.username);
		User.findByUsername( req.params.username, function(err, user ){
			if(err){
				next(err);
				return;
			}		
			var data = mapUserModels(user);				
			res.render("client/users/profile", {user: data });
			res.end();
		});
	},	
	register : function( req, res, next ){
		
		// POST
		if(req.method == 'POST'){
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
					res.redirect("user/register");					
				}
			});	
			return;
		}	
		// GET
		else if(req.method == 'GET'){
			if(req.session.user  != null)
				res.redirect("/");
			else
				res.render('client/users/register', {
					title:'Registration User'
				});		
		}
	},
	logout : function (req, res, next) {
		req.session.destroy(function(){
			res.redirect('/');
		});	 	
	},
	login : function( req, res, next ){

		// GET
		if( req.method == 'GET'){
			if(req.session.user){
				res.locals.user =  req.session.user || null;
				res.redirect("/");
			}else{
				var returnUrl 	  = req.session.admin_return_url;
				var messageAccess = req.session.admin_message_access;
				var err = req.session.err;
				delete req.session.admin_return_url;
				delete req.session.admin_message_access;
				delete req.session.err;

				if(returnUrl)
					res.locals.returnUrl = returnUrl;
				if( messageAccess )		 
					res.locals.messageAccess = messageAccess;
				if( err)
					res.locals.messageError = err;
				res.render('client/users/login', {title:'Login'});	
			}
			return;
		}
		// POST
		else if( req.method == 'POST' ){
			var username = req.body.username;	
			var password = req.body.password;
			var returnUrl = req.body.return_url;
			User.login( username, password, function( err, user ){	
				if(err){			
					req.session.err = err.message;
					res.redirect("/user/login");
				}else{						
					req.session.user = mapUserModels(user);
					if(returnUrl)
						res.redirect(returnUrl);
					else
						res.redirect("/");
				}				
			});		
		}
	},	
	edit : function (req, res, next ){
		// Neu chua login thi chuyen huong ve trang Home
		if( req.session.user  == null )			
			res.redirect("/");

		if( req.method == 'POST' ){		

			var user = new User();					
			user.id = +req.session.user.id;								
			user.password = req.body.password;			
			user.email = req.body.email;			
			user.first_name = req.body.first_name;			
			user.last_name = req.body.last_name;		

			User.update( user, function(err, result ){
				if(err){
					req.session.error = err.message;					
					return;
				}
				if( result == true ) req.session.success = 'Save successfully !';
				else req.session.error = 'Save failed!';
				res.redirect("/user/edit");
			});			
			

		}else{

			// GET 
			// su dung Session 1 lan de show messsage
			// gan message cho bien err,msg
			var err = req.session.error; 
			var msg = req.session.success;
			console.log( req.session.user.id);
			// xoa session 
			delete req.session.error;
			delete req.session.success;
			res.locals.message = '';
			
			// kiem tra session, sau do gan vao bien res.locals.message
			if (err) res.locals.message = '<p class="msg bg-danger">' + err + '</p>';
			if (msg) res.locals.message = '<p class="msg bg-success">' + msg + '</p>';		

			// lay data cua user
			User.findById( req.session.user.id, function( err, user ){	
				if(err){
					next(err);
					return;
				}
				res.render('client/users/edit', {title:'Edit User', user: user } );
			});				
		}
	}

}