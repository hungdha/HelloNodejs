//var router = require("express").Router();
var Post = require("../../models/post");
module.exports = {	
	list : function(req, res, next ){
		var post = new Post();
		post.post_status = "publish";
		post.all(function(err, posts){		
			if(err){
				next(err);
				return;		
			}	
			if(posts){
				res.render("client/posts/list", {title:"Post List", posts: JSON.stringify(posts) });
				res.end();
			}else{
				res.render("client/posts/list", {title:"Post List", posts: "" });
				res.end();
			}
		});	
	},


	/*router.get("/del/:id", function(req, res, next ){	
		var post = new Post();
		post.ID = +req.params.id;
		post.delete(function(err, posts){
			if(err){			 
			    next(err);
			    return;		    	
			}
			res.send("Delete successful");		
		});		
	});*/

	search : function(req, res, next ){	
		var post = new Post();
		post.post_title = req.query.keyword;
		post.search(function(err, posts){		
			if(err){
				next(err);
				return;		
			}	
			if(posts){
				res.render("client/posts/list", {title:"Post List", keyword: req.query.keyword , posts: JSON.stringify(posts) });
				res.end();
			}else{
				res.render("client/posts/list", {title:"Post List", keyword: req.query.keyword, posts: "" });
				res.end();
			}
		});	
	}
};

// module.exports = router;