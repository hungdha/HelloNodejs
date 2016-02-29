var express = require("express");
var router = express.Router();
var db = require("../database");
var model1 = require("../contact");




router.get("/", function (req, res, next) {
    var a = new model1.mContact(10, "Jhon Marken","Gio linh","90011","tuanhung@gmail.com","Hello Nodejs");
    console.log(a.save());
    //console.log(contact.getAll());
    //console.log(contact.getContact(1));
    res.render("contact", {title: "Contact"});
    // next();
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

    conn.query('SELECT * FROM n_contacts', function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    });
    res.render("contact", {title: "Contact"});
});


module.exports = router;