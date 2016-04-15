var router = require("express").Router();
var db = require("../../lib/database");
var contactModel = require("../../models/contact");
var sprintf = require("sprintf").sprintf;
var nodemailer = require("nodemailer");

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function sendEmail(){
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: false, // use SSL 
        auth: {
            user: 'hunglv.dlu@gmail.com',
            pass: 'sunlight742'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: "Fred Foo <hunglv.dlu@gmail.com>", // sender address                    
        to: 'tuanhung.cntt@gmail.com', // list of receivers 
        subject: 'Hello', // Subject line 
        text: 'Hello world', // plaintext body 
        html: '<b>Hello world</b>' // html body 
    };
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            //return console.log(error);
            return console.log( error);
        }
        console.log('Message sent: ' + info.response);
    });    
    console.log('Program Ended!');
}

router.get("/", function (req, res, next) {
    /*var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;    
    delete req.session.success;
    if(err)
        res.locals.message = err;
    if(msg)
        res.locals.message = msg;*/
    res.render("client/contact", {title: "Contact", msgErrors:"", body:"" });    
});

router.post("/", function (req, res, next) {
       
    var msgErrors = [];
    var isError = false;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var message = req.body.message;
  //console.log(validateEmail(email)); 
    // Validate all field before insert to database
    if( name == "" || name === undefined ){
        msgErrors.push("Required field name");
        isError = true;
    }

    if( email == "" || email === undefined){
        msgErrors.push("Required field email");
        isError = true;
    }else if(!validateEmail(email)){
        msgErrors.push("Email invalid!");
        isError = true;
    }


    if( phone == "" || phone === undefined ){
        msgErrors.push("Require field phone");
        isError = true;
    }
    if( address == "" || address === undefined){
        msgErrors.push("Require field address");
        isError = true;
    }
    if( message == "" || message === undefined ){
        msgErrors.push("Require field message");
        isError = true;
    }    
    if( !isError ) {
        var sql = sprintf('INSERT INTO n_contacts SET name = "%s", email="%s", address="%s", phone="%s", message="%s"', name, email, phone, address, message);
        var result = {};
        db.query(sql, [], function (err, rows, fields) {                        
            if (err)
                throw err;
            if( rows.affectedRows > 0 ){                                
                result = {status : 1, msgs: ["Insert successful!"] };
            }else{
                result = {status : 0, msgs: ["Insert failed!"] } ;                
            }            
            res.send(result);
            res.end();
        });
    }else {        
         res.send({status: 0, msgs: msgErrors} );
         res.end();
    }
});


module.exports = router;