var express = require("express");
var router = express.Router();
var app = express();

app.get('/', function(req, res, next){
	if(req.session.user)
		res.redirect("/");
	else    
		res.redirect("user/register");
});

module.exports = router;