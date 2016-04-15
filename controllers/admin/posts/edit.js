var router = require("express").Router();
var Post = require("../../../models/post");

router.get("/:id",	function(req, res, next){
	
	// Session Message
	var err = req.session.err;
	var msg = req.session.success;
	delete req.session.err;
	delete req.session.success;
	if(err)
		res.locals.message = err;
	if(msg)
		res.locals.message = msg;
	// End

	var post_id = +req.params.id;
	new Post(post_id).get(function(err, post ){
		if(err) throw err.toString();				
		if( post == false)
			res.redirect("/admin/posts/entry");		
		else
			res.render("admin/posts/edit", { title:"Edit Post", post: post });		
		res.end();
	});	
});

router.post("/:id",	function(req, res, next){
	var postID = +req.params.id;
	var post = new Post();
	post.ID = postID;
	post.post_title = req.body.post_title;
	post.post_name 	= req.body.post_title;
	post.post_excerpt = "";
	post.post_content = req.body.post_content;
	post.post_status = 1;
	post.post_type = 1;	
	post.post_modified = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	post.post_author = req.session.user.id;
	console.log(post);
	post.save(function(err, info ){
		if( info.affectedRows > 0 ){			
			req.session.success = "Post updated";
			res.redirect("/admin/posts/edit/" + postID );
		}
		else{
			req.session.error = "Post updated error";
			res.redirect("/admin/posts/edit/" + postID);
		}		
		res.end();
	});	
});


module.exports  = router;