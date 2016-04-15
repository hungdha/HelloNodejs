module.exports = function (app) {	
	
	// HomePage  Controllers
	app.use('/', require("./controllers/homepage/index"));
	app.use('/about', require("./controllers/homepage/about"));


	// User Controllers
	app.use('/user/login', require("./controllers/users/login"));
	app.use('/user/register', require("./controllers/users/register"));
	app.use('/user/logout', require("./controllers/users/logout"));
	app.use('/user/profile', require("./controllers/users/profile"));
	app.use('/user/edit', require("./controllers/users/edit"));




}