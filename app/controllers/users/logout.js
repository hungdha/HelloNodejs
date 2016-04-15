module.exports = function(app){
	app.get("/user/logout", function (req, res) {
	    req.session.destroy();
	 	res.redirect('/');
	});
}