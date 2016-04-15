var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
	//res.locals.user =  req.session.user || null;
    res.render('client/about', {title:'About Us'});
});

module.exports = router;