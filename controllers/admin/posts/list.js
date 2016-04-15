var router = require("express").Router();
var Post = require("../../../models/post");

router.get("/",	function(req, res, next){	
	res.render("admin/posts/list", {title:"Posts List"});
	res.end();
});

module.exports = router;