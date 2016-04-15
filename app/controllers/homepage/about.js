module.exports = function(app){
	app.get('/about', function(req, res, next){
		res.locals.user =  req.session.user || null;
	    res.render('about', {title:'About Us'});
	});
}