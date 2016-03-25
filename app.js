var express = require('express');
var path = require("path");
var favicon = require('serve-favicon');
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var http = require("http");
var session = require("express-session");





var app = express();

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

app.use('/scripts', express.static(__dirname + '/node_modules/angular/'));


// HomePage  Controllers
app.use('/', require("./controllers/homepage/index"));
app.use('/about', require("./controllers/homepage/about"));
app.use('/contact', require("./controllers/homepage/contact"));

// User Controllers
app.use('/user/login', require("./controllers/users/login"));
app.use('/user/register', require("./controllers/users/register"));
app.use('/user/logout', require("./controllers/users/logout"));
app.use('/user/profile', require("./controllers/users/profile"));
app.use('/user/edit', require("./controllers/users/edit"));


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
        res.status(err.status || 500);
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
        error: {}
    });
});

//console.log(app);
module.exports = app;