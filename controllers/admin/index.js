var router = require("express").Router();

router.get("/" , function (req, res, next) {    
    if(req.session.user){    	
    	res.send("Admin Dashboard");    
    }else{
    	res.redirect("/user/login");	
    }
    res.end();
});

module.exports = router;
