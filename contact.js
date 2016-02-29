var express = require("express");
var mysql = require("mysql");
//var app = express();

var printf = require('sprintf');
var sprintf = printf.sprintf;
var vsprintf = printf.vsprintf;
var conn = require("./database");



var Contact = function (_id, _name, _address, _phone, _email, _message ){

    this.id = _id;
    this.name = _name;
    this.address = _address;
    this.phone = _phone;
    this.email = _email;
    this.message = _message;
    this.save = saveFunc;
    this.delete =  delFunc;
    this.getContact = getContactFunc;
    this.getAll = getAllContactFunc;
}


var saveFunc = function(){
    if(this.id > 0 ) {
        // Update
        var sql = sprintf('UPDATE n_contacts SET name = "%s", address="%s", phone="%s"', this.name, this.address, this.phone );
        conn.query(sql, [], function(err, rows){
            if(err)throw err.toString();
            console.log(rows);
            return rows;
        });
    }else {
        // Insert
        var obj = this;
        var contactArr = Object.keys(obj).map(function (key) {
            return obj[key];
        });
        var sql = vsprintf('INSERT INTO n_contacts SET name = "%s", address="%s", phone="%s"', contactArr);
        conn.query(sql, [], function(err, rows ){
            if(err)  throw err.toString();
            console.log(rows);
            return rows;
        });
    }
    return false;
}

var delFunc = function(){
    if(this.id > 0){
        var sql = sprintf('DELETE FROM n_contacts WHERE id=%s', this.id );
        conn.query(sql, [], function(err, res ){
            if(err) throw err.toString();
            console.log(res);
        });
        console.log(sql);
    }else{
        return false;
    }
}

var getContactFunc = function ( _id ){
    var id = 0;
    if(this.id !== undefined )
        id =  this.id;
    else if(_id !== undefined)
        id =  _id;
    conn.query("SELECT * FROM n_contacts WHERE id = ?",[id], function(err, row){
        if(err)
            throw err.toString();
        console.log(row);
        return row;
    });
}
var getAllContactFunc = function(){
    conn.query("SELECT * FROM n_contacts",[], function(err, rows){
        if(err)
            throw err.toString();
        console.log(rows);
        return rows;
    });
}



//new Contact().getContact(1);
//var contact = new Contact(0, "Hoa Thuy Tinh", "Hoang Hoa Tham", "112", "hung@gmail.com", "Said hello nodejs" );
//new Contact(11).delete();
exports.mContact = Contact;
exports.getContact = getContactFunc;
exports.getAll = getAllContactFunc;
exports.save = saveFunc;
exports.delete = delFunc;
