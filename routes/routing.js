module.exports = {
	registerRoutes:function(app) {
		



		/*
		 HomePage  Controllers 
		
		var ctrl_dir = "./controllers";
		app.use('/', require( ctrl_dir + "/client/index") );
		app.use('/about', require( ctrl_dir + "/client/about"));
		app.use('/contact', require(ctrl_dir + "/client/contact"));
		*/




		/*
		// Post Controllers
		var posts = require("../controllers/client/posts");
		//app.get('{controllers}/{action}/{id}', posts.list);
		app.get('/posts', posts.list);
		app.get('/posts/search', posts.search);	
		*/





		// User Controllers
		/*
		var user = require("../controllers/client/users");		
		app.get('/user/profile/:username', user.profile );
		app.use('/user/register', user.register );			
		app.get('/user/logout', user.logout );		
		app.use('/user/edit', user.edit );
		app.use('/user/login', user.login );	
		*/





		// Restaurent Controllers
		var restaurent = require("../controllers/client/restaurents");		
		app.get('/restaurents', restaurent.index );	
		app.post('/restaurents/delete', restaurent.delete );		
		app.post('/restaurents/update', restaurent.update );
		app.get('/restaurents/details/:id', restaurent.details );
		app.get('/restaurents/loadAjax', restaurent.loadAjax );	
		app.get('/restaurents2', restaurent.test );




		/*

		// ADMIN ROUTES
		// Admin Dashboard Controllers
		app.use('/admin', require( "./controllers/admin/index"));

		// Admin Contacts Controllers
		var ctrlContractAdminDir = "./controllers/admin/contacts/";
		app.use('/admin/contacts', require(ctrlContractAdminDir + "list"));
		//app.use('/admin/contact/details', require("./admin/controllers/contacts/details"));
		//app.use('/admin/contact/reply', require("./admin/controllers/contacts/reply"));

		// Admin Posts Controllers
		var ctrlPostAdminDir = "./controllers/admin/posts/";
		app.use('/admin/posts/entry', require(ctrlPostAdminDir + "entry"));
		app.use('/admin/posts/edit', require(ctrlPostAdminDir + "edit"));
		app.use('/admin/posts', require(ctrlPostAdminDir + "list"));
		*/
	}
}