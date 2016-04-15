/*
* Module Post Model
*/
//var sprintf = require('sprintf').sprintf;
var db = require("../lib/database");

var Post = function(id){
	var _id = id || 0;
	this.ID = _id;
	this.post_title = "";
	this.post_name = "";
	this.post_excerpt = "";
	this.post_content = "";
	this.post_status = 0;	
	this.post_type = 1;
	this.post_date = "0000-00-00 00:00:00";		
	this.post_modified = "0000-00-00 00:00:00";
	this.post_author = 0;
	this.comment_status = 'open';
	
}

Post.prototype.save = function(callback){
	// Update 
	if(this.ID > 0 ){
		var sql = "UPDATE #__posts SET post_title = ?,post_name = ?, post_excerpt= ?, post_content= ?, post_status= ?, post_type= ? , post_modified=?, post_author= ?, comment_status = ? WHERE ID = ? ";
		db.query(sql, [this.post_title, this.post_name, this.post_excerpt, this.post_content, this.post_status, this.post_type, this.post_modified, this.post_author, this.comment_status], function(err, info ){
			return callback(err, info);
		});	
	}else{ // Add
		var sql = "INSERT INTO #__posts(post_title, post_name, post_excerpt, post_content, post_status, post_type, post_date, post_modified , post_author, comment_status ) VALUES(?,?,?,?,?,?,?,?,?,?)";
		var params = [this.post_title, this.post_name , this.post_excerpt, this.post_content, this.post_status, this.post_type, this.post_date, this.post_modified, this.post_author, this.comment_status];
		db.query(sql, params, function(err, info){			
			return callback(err, info);
		});
	}
}

// Method delete post by ID
Post.prototype.delete = function(callback){

	if(this.ID > 0){		
		db.query("DELETE FROM #__posts WHERE ID = ?", [this.ID], function(err, info){			
			return callback(err, info);
		});
	}else
		return callback({'error':1}, false);

}

// Method get post by ID
Post.prototype.get = function(callback){
	if(this.ID > 0){		
		db.query("SELECT * FROM #__posts WHERE ID = ?", [this.ID], function(err, rows){
			var post = ( rows.length > 0 ) ? rows[0] : false;
			return callback(err, post);
		});
	}else
		return callback(null, false);
}

// Method get all post
Post.prototype.all = function( callback ){	

	var sql = "SELECT * FROM #__posts WHERE post_status= ? ";
	db.query(sql, [this.post_status], function(err, posts ){						
		return callback(err, posts);
	});	
}
// Method search
Post.prototype.search = function( callback ){	

	var sql = "SELECT * FROM #__posts WHERE post_title LIKE ? ";
	db.query(sql, ["%" + this.post_title + "%"], function(err, posts ){						
		return callback(err, posts);
	});	
}



module.exports = Post;