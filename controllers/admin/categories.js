exports = {
	registerRoutes : function(app){
		app.get("/category/:id", this.home);
		app.get("/category/:id", this.home);
	}
	home: function(req, res, next) {
		var customer = Customer.findById(req.params.id);
		if(!customer) return next(); // pass this on to 404 handler
		res.render('category/home', customerViewModel(customer));
	}
	preferences: function(req, res, next) {
		var customer = Customer.findById(req.params.id);
		if(!customer) return next(); // pass this on to 404 handler
		res.render('category/preferences', customerViewModel(customer));
	}
}