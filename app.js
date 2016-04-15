var express = require('express');
var path = require("path");
var favicon = require('serve-favicon');
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var http = require("http");
var session = require("express-session");





var app = module.exports = express();

// view engine setup

app.set("views", path.join(__dirname, "views" ));
app.set('view engine', 'jade');

//app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, resave: true, saveUninitialized: true }));
// 
app.use('/scripts', express.static(__dirname + '/node_modules/angular/'));

// tat ca request deu di qua func nay.
app.use(function(req, res, next){
    console.log("start...");    
    res.locals.user = req.session.user || null;

    // Permission Folder Admin
    var path = req.originalUrl.split("/")[1];
    if( path == "admin"){ 

        if( !req.session.user ){
            req.session.admin_message_access = "Access denied - You are not authorized to access this page.";        
            req.session.admin_return_url = req.originalUrl;
            res.redirect("/user/login");
        }
        else if( req.session.user.level != 2 ){
            res.redirect("/");   
        }
    }    
    next();
});



// Register Routes
require("./routes/routing").registerRoutes(app);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');   
    err.status = 404;
    err.title = "Error";    
    next(err);
});



// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {        
        res.status( err.status || 500);
        err.status = err.status || 500;           
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
   
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});



