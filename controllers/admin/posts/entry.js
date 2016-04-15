var router = require("express").Router();
var Post = require("../../../models/post");

router.get("/",	function(req, res, next){	
	res.render("admin/posts/entry", {title:"Add New Post"});
	res.end();
});
router.post("/", function(req, res, next ){

	var post = new Post();
	post.post_title = req.body.post_title;
	post.post_name 		= req.body.post_excerpt;
	post.post_excerpt = req.body.post_excerpt;
	post.post_content = req.body.post_content ;
	post.post_status = "publish";
	post.post_type = 1;
	post.post_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');				
	post.post_modified = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	post.post_author = req.session.user.id;
	post.comment_status = req.body.comment_status ? 'open' : 'close';
	console.log(post);
//	res.redirect("/admin/posts/entry/");
//	res.end();

	post.save(function(err, info ){				
		if(err){ 
		 	next(err);
			return;
		}
		if(info.insertId > 0){
			req.session.success = "Post published";
			res.redirect("/admin/posts/edit/" + info.insertId );
		}
		else{
			req.session.error = "Post failed";
			res.redirect("/admin/posts/entry/");
		}
	});	
});

module.exports = router;