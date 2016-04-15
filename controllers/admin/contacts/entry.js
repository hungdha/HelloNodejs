var router = require("express").Router();

router.get("/",	function(req, res, next){
	res.render("client/posts/entry", {title:"Entry Post"});
	res.end();
});

router.post("/", function(req, res, next ){
	res.send("hello entry");
	res.end();
});

module.exports = router;