var express = require('express');
var path = require("path");
var favicon = require('serve-favicon');
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var http = require("http");


// set router with controller
var routes = require("./routes/index");
var users = require("./routes/users");
var about = require("./routes/about");
var contact = require("./routes/contact");


var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views" ));
app.set('view engine', 'jade');
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json( ));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
app.use('/contact', contact);


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

module.exports = app;

/*
var mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'hellonodejs_db';
var TABLE = 'n_posts';

var connection = mysql.createConnection({
    host     : HOST,
    user     : MYSQL_USER,
    password : MYSQL_PASS,
    database : DATABASE
});
connection.connect();
*/
// select all
/*
connection.query('SELECT * FROM n_contacts', function(err, rows, fields) {
    if (err) throw err;

    console.log(rows);
});
*/

// insert row
/*
connection.query('INSERT INTO n_contacts SET name = "Hoang Dung", address="Dong Ha", phone="09999" ', function(err, info ) {
    if(err) throw err;
    console.log(info);
});
*/

// update
/*
connection.query('UPDATE n_contacts SET ?, ? WHERE ?', [{ name: 'Hung Kieu' },{address:'Gio Linh'}, { id: 5 }], function(err, info){
    if(err) throw err;
    console.log(info);
});
*/

// delete
/*
connection.query('DELETE FROM n_contacts WHERE id=?', [10], function(err, res ){
    if(err) throw err.toString();
    console.log(res.affectedRows);
});


connection.end();
 */


