var express = require("express");
var mysql = require("mysql");
var db = require("../lib/database");
var sprintf = require("sprintf").sprintf;
var hash = require("../helpers/crypt").hash;


var User = function ( data ){
	if( typeof data != "object" ){
		data = {};
	}
	

	this.id = data.id || 0;
	this.first_name = data.first_name || "";
	this.last_name = data.last_name || "";
	this.register_date = data.register_date ||  "0000-00-00 00:00:00";
	this.username = data.username || "";
	this.password = data.password || "";
	this.email = data.email || "";
	this.level = data.level || 0;
	this.fullName = function()		{
		return this.first_name + " " + this.last_name;
	}	
}



User.login = function( username, password, callback ){
	var sql = "SELECT * FROM n_users WHERE username = ? AND password = ? ";	
	db.query(sql, [username, password], function(err, rows ){
		if(err)			
			return callback(err, []);
		else if( rows.length > 0 )
			return callback(err, new User(rows[0]) );
		else{
			var error = new Error("Username or password don't match. Please try again.");
			return callback(error, []);	
		}
		
	});
};
User.save = function( user,  callback ){
	
	// Update
	if(user.id > 0 ){
		var sql = "UPDATE n_users SET first_name =?, last_name=?, password=?, email=?, level = ? WHERE id=? ";			 
		db.query(sql, [user.first_name, user.last_name ,user.password, user.email, user.level, user.id], function(err, rows ){			
			return callback(err, rows );
		});
	}
	// insert
	else if( user.id == 0 ){
		user.register_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');			
		var sql = "INSERT INTO n_users SET register_date= ?, username = ?, password= ?, email= ?, level= ? ";
		db.query(sql, [user.register_date,  user.username, user.password, user.email, user.level], function(err, rows ){	        	
			return callback( err, rows );
		});
	}
};	

User.update = function( user, callback){

	User.save(user, function(err, rows){
		if(err)
			return callback(err);
		return callback(null, rows.affectedRows > 0 );
	});
};

User.insert = function(user, callback ){

	User.save(user, function(err, rows){
		if(err) return callback(err);
		return callback(null, rows.insertId );
	});
}


User.findById = function(_id, callback ){
	if(_id !== undefined && _id > 0 ){
		var sql =  "SELECT * FROM n_users WHERE id = ? ";	
		db.query(sql, [_id], function(err, rows ){				
			return callback( err, new User(rows[0]) );
		});						
	}
};
User.findByUsername = function( username , callback ){
	if( !username)
		return callback(new Error('No user matching ' + username ) );
	var sql = "SELECT * FROM n_users WHERE username = ?";
	db.query(sql, [username], function(err, rows){
		if(err) return callback(err);
		if( rows.length == 0 ) 
			return callback(new Error('No user matching ' + username));	
		return callback(err, new User(rows[0]) );
	});
}

User.findByEmail = function(email, callback){
	if(!email) 
		return callback(new Error("Bad email !"));
	var sql = "SELECT * FROM n_users WHERE email = ?";
	db.query(sql,[email], function(err, rows ){
		if(err) return callback(err);		
		if(rows.length == 0)
			return callback(new Error('No email matching ' + email));	
		return callback(null, new User(rows[0]) );
	});
};
module.exports = User;