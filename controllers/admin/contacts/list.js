var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    //res.locals.user =  req.session.user || null; 
    res.render("admin/contacts/list", {title: "Contact", msgErrors:"", body:"" });    
});

module.exports = router;