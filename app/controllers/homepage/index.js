var db = require("../../../lib/database");
var sprintf = require("sprintf").sprintf;
var vsprintf =  require("sprintf").vsprintf;

module.exports = function(app){
    
	app.get('/about', function(req, res, next){	
		res.locals.user = req.session.user || null;
	    res.render('about', {title:'About'});
	});
	app.get("/contact", function (req, res, next) {
        res.locals.user =  req.session.user || null; 
        res.render("contact", {title: "Contact", msgErrors:"", body:"" });    
    });

    app.post("/contact", function (req, res, next) {

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
            var sql = sprintf('INSERT INTO n_contacts SET name = "%s", email="%s", address="%s", phone="%s", message="%s"', name, email, phone, address, message);
            db.query(sql, null, function (err, rows, fields) {
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
}