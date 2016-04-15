var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/test');

var  restaurentSchema = { 	
	address: {
		building: String,
		coord : [ Number, Number ],
		street : String,
		zipcode : String
	},
	borough : String,
	cuisine : String,
	grades: [{
		date : Date,
		grade :  String,
		score :  Number,		
	}],
	name : String,
	restaurant_id : String
};
var Restaurent = mongoose.model('Restaurent',  restaurentSchema );
module.exports = Restaurent;

