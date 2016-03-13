var express = require("express");
var router = express.Router();
var conn = require("../database");
var contactModel = require("../contact");
var sprintf = require("sprintf").sprintf;
var vsprintf =  require("sprintf").vsprintf;


router.get("/", function (req, res, next) {
       //var a = new model1.mContact(10, "Jhon Marken","Gio linh","90011","tuanhung@gmail.com","Hello Nodejs");
    //console.log(a.save());
    //console.log(contact.getAll());
    //console.log(contact.getContact(1));
    // var id = req.params.id;
    //var cate = req.params.cate;

    /*console.log("------------");
     console.log(id);
     console.log(cate);
     console.log("Program 1");
     var contact  = contactModel.getContact(id);
     console.log(contact);
     console.log("Program 2");*/

    res.render("contact", {title: "Contact", msgErrors:"", body:"" });
    //next();
});
/*
router.get("/:id", function (req, res, next) {
    //var a = new model1.mContact(10, "Jhon Marken","Gio linh","90011","tuanhung@gmail.com","Hello Nodejs");
    console.log( req.params.id);
    //console.log(contact.getAll());
    //console.log(contact.getContact(1));
    res.render("contact", {title: "Contact"});
    // next();
});
*/
router.post("/", function (req, res, next) {

    var _msgErrors = [];
    var _isError = false;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var message = req.body.message;

    // Validate all field before insert to database
    if( name == ""){
        _msgErrors.push("Required field name");
        _isError = true;
    }
    if( email == "" ){
        _msgErrors.push("Required field email");
        _isError = true;
    }
    if( phone == "" ){
        _msgErrors.push("Require field phone");
        _isError = true;
    }
    if( address == ""){
        _msgErrors.push("Require field address");
        _isError = true;
    }
    if( message == "" ){
        _msgErrors.push("Require field message");
        _isError = true;
    }
    if( !_isError ) {
        var sql = vsprintf('INSERT INTO n_contacts SET name = "%s", email="%s", address="%s", phone="%s", message="%s"', [name, email, phone, address, message]);
        conn.query(sql, null, function (err, rows, fields) {
            var callback = function (_note) {
                res.render("contact", {title: "Contact", note: _note});
            }
            if (err)
                throw err;
            if (rows.affectedRows > 0)
                _msgErrors.push("Insert successful!");
            else
                _msgErrors.push("Insert failed!");

            res.render("contact", {title: "Contact", msgErrors: _msgErrors, body : ""});
           // res.end();
        });
    }else {
        res.render("contact", {title: "Contact", msgErrors: _msgErrors, body : req.body });
    }
});


module.exports = router;