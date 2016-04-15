var express = require("express");
var mysql = require("mysql");
var db = require("../../lib/database");
var sprintf = require("sprintf").sprintf;
var hash = require("../helpers/crypt").hash;


module.exports = function ( _id ){
	
	this.id = 0;
	this.first_name = "";
	this.last_name = "";
	this.register_date = "0000-00-00 00:00:00";
	this.username = "";
	this.password = "";
	this.email = "";
	this.level = 0;
	
	this.login = function( username, password, callback ){
		var sql =  sprintf( "SELECT * FROM n_users WHERE username = '%s' AND password = '%s' ", username, password );	
		db.query(sql, [], function(err, rows ){
			if(err) throw err;
			callback(rows);
		});
	};
	this.save = function( callback ){
		// Update
		if(this.id > 0 ){
			var sql = sprintf('UPDATE n_users SET first_name = "%s", last_name="%s", password="%s", email="%s", level = %d WHERE id=%d ', 
				this.first_name, this.last_name ,this.password, this.email, this.level, this.id );			
			db.query(sql, [], function(err, rows ){
				callback(err, rows );
			});
		}
		// insert
		else if( this.id == 0 ){ 
			this.register_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');			
			var sql = sprintf('INSERT INTO n_users SET register_date="%s", username = "%s", password="%s", email="%s", level= %d ', this.register_date,  this.username, this.password, this.email, this.level );	        
	        db.query(sql, [], function(err, rows ){	        	
	            callback( err, rows );
	        });
		}
	};
	this.set = function( rows ){
		
	}
	this.get = function(_id, callback ){
		if(_id !== undefined && _id > 0 ){
			var sql =  sprintf( "SELECT * FROM n_users WHERE id = '%d' ", +_id );	
			db.query(sql, [], function(err, rows ){
				if(err) throw err;								
				callback(rows[0]);
			});						
		}
	}
}
