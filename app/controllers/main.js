// home page
var home_index = require("./homepage");

// user
var user_index = require("./users");

module.exports = function (app) {
       
    // user
    user_index(app);
    home_index(app);
	

    //Tất cả request phải đi qua trang index.html để xử lý.
    /*app.get('*', function(req, res, next) {
        console.log("*************************");
        var err = new Error('Not Found');  
	    err.status = 404;
	    err.title = "Error";   
	    next(err);
    });*/
    
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

};
