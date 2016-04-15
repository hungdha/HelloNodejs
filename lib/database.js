
//require("../config");
var mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'hellonodejs_db';


var connectionState = false;
var connection = mysql.createConnection({
    host: HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: DATABASE,
    insecureAuth: true
});
connection.on('close', function (err) {
    console.error('mysqldb conn close');
    connectionState = false;
});
connection.on('error', function (err) {
    console.error('mysqldb error: ' + err);
    connectionState = false;
});

function attemptConnection(connection) {
    if(!connectionState){
        connection = mysql.createConnection(connection.config);
        connection.connect(function (err) {
            // connected! (unless `err` is set)
            if (err) {
                console.error('mysql db unable to connect: ' + err);
                connectionState = false;
            } else {
                console.info('mysql connect!');
                connectionState = true;
            }
        });
        connection.on('close', function (err) {
            console.error('mysqldb conn close');
            connectionState = false;
        });
        connection.on('error', function (err) {
            console.error('mysqldb error: ' + err);
            if (!err.fatal) {
                //throw err;
            }
            if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                //throw err;
            } else {
                connectionState = false;
            }

        });
    }
}
attemptConnection(connection);

var dbConnChecker = setInterval(function(){
    if(!connectionState){
        console.info('not connected, attempting reconnect');
        attemptConnection(connection);
    }
}, 10000);

// Mysql query wrapper. Gives us timeout and db conn refreshal!
var queryTimeout = 100000;
var query = function(sql,params,callback){
    if(connectionState) {
        // 1. Set timeout
        var timedOut = false;
        var timeout = setTimeout(function () {
            timedOut = true;
            callback('MySQL timeout', null);
        }, queryTimeout);

        // 2. Make query
        connection.query(sql, params, function (err, rows) {
            clearTimeout(timeout);
            if(!timedOut) callback(err,rows);
        });
    } else {
        // 3. Fail if no mysql conn (obviously)
        callback('MySQL not connected', null);
    }
}


// And we present the same interface as the node-mysql library!
// NOTE: The escape may be a trickier for other libraries to emulate because it looks synchronous
exports.query = query;
exports.escape = connection.escape;
