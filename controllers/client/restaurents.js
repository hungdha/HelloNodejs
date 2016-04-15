/*
url : http://mongoosejs.com/docs/queries.html
// With a JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);
  
// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);

  */


  var Restaurent = require("../../models/restaurent");
  module.exports = {	
  	index : function( req, res, next ){	
  		if(!req.query.search){					
  			res.render("client/restaurents/list", { 
  				title:"Search Restaurent", 
  				restaurents: 0,
  				pageNumber : 0,
  				pageTotal  : 0
  			});
  			res.end();
  			return;
  		}

		// So page, gioi han so page
		var pageLimit = 10;
		var pageNumber = req.query.page;
		var pageOffset = 0;
		var querySearch = req.query.search;

		if( pageNumber > 0)
			pageOffset = ( pageNumber - 1 ) * pageLimit ;	
		else{
			pageOffset = pageNumber = 1;			 
		}
		// query tim kiem, theo bieu thuc Like
		var query = { name:  new RegExp(querySearch, "i") }; 	
		
		// function goi lai sau thi thuc thi xong  cau lenh query
		var callback = function(err, restaurents  ){	

			// query tim kiem, theo bieu thuc Like		
			Restaurent.count( query )
			//.where({"address.building" : /1/ })
			//.where({"address.street" : /Avenue/})
			.exec(function(err, counts ){

				var pageTotal = Math.ceil(counts / pageLimit);			
				res.render("client/restaurents/list", { 
					title:"Search Restaurent", 
					restaurents: restaurents,
					pageNumber : pageNumber,
					pageTotal  : pageTotal
				});
				res.end();
			});
		}	

		Restaurent.find( query ) // tim kiem theo name 
		//.where({"address.building" : /1/ }) //  dieu kien di kem
		//.where({"address.street" : /Avenue/})
		//.select("name address") //  chon truong hien thi
		.skip(pageOffset) // lay tu vi tri
		.limit(pageLimit) // gioi han item
		.sort({cuisine:1})
		.exec(callback);	// thuc thi can lenh

		
	},
	loadAjax : function( req, res, next ){	
		
		// var columns = [ "name", "borough", "cuisine", "restaurant_id" ];
		
		// So page, gioi han so page
		var pageLimit = req.query.length;			
		var querySearch = req.query.search.value;				
		var draw = req.query.draw;	
		var pageOffset = req.query.start;
		var querySort = {};
		var queryWhere = {};
		
		// Check Order
		if(req.query.order !== undefined ){	
			var index = parseInt( req.query.order[0].column);
			var sortType = (req.query.order[0].dir == "desc") ? -1 : 1 ;
			switch(index){

				case 1: //name
					querySort = { "name" : sortType };	
					break;
				case 2: // borough
					querySort = { "borough" : sortType };	
					break;
				case 3: //cuisine
					querySort = { "cuisine" : sortType };
					break;
				case 4: // grades
					querySort = { "grades" : sortType };
					break;
				case 5: // 	restaurant_id
					querySort = { "restaurant_id" : sortType };
					break;
				default : 
					querySort = {};
					break;

			}		
		}	

		// query tim kiem, theo bieu thuc Like		
		var query = { name: (querySearch != "") ? new RegExp(querySearch, "i") : {$ne:""}  }; 	
		
		// function goi lai sau thi thuc thi xong  cau lenh query
		var callback = function(err, restaurents  ){	

			// query tim kiem, theo bieu thuc Like		
			Restaurent.count( query )
			.where( queryWhere )
			//.where({"address.street" : /Avenue/})
			.exec(function(err, counts ){

				var newArray = []; 
				var i = 0;
				for (var j = 0; j < restaurents.length; j++) {
					var restaurent = {
						"name" : restaurents[j].name,
						"address" : restaurents[j].address,
						"cuisine" : restaurents[j].cuisine,
						"borough" : restaurents[j].borough,
						"grades_count" : restaurents[j].grades.length,
						"grades" : restaurents[j].grades,
						"restaurant_id" : restaurents[j].restaurant_id,
						"_id" : restaurents[j]._id
					}					
					newArray.push( restaurent );																				
				}	


				var dataJson = {
					"draw": draw,
					"recordsTotal": counts ,
					"recordsFiltered": counts,
					"data": newArray
				};
				res.json(dataJson);
				res.end();
			});
		}	
		console.log("querySort:");
		console.log(querySort);
		console.log("query");
		console.log(query);
		console.log("pageOffset %s" , pageOffset);
		
		
		Restaurent.find( query ) // tim kiem theo name 
		.where(queryWhere) //  dieu kien di kem
		//.where({"address.street" : /Avenue/})
		//.select("name address") //  chon truong hien thi
		.skip(pageOffset) // lay tu vi tri
		.limit(pageLimit) // gioi han item
		.sort(querySort)
		.exec(callback);	// thuc thi can lenh*/
	},





	/*
		Method POST Delete data by ID
	*/
	delete : function(req, res, next ){
		var obj = { err:0, message: "", docs :[]};
		var id = req.body.id || 0;		
		
		// find and remove			
		Restaurent.findById(id, function (err, doc) {
		    if(err){
		    	obj.err = 1;
		    	obj.message = err.message;
	    	}
		    else if(doc){
		    	doc.remove(callback); //Removes the document
		    	return;
		    }
		    else{
		    	console.log("coming here.");
		    	obj.err = 1;
		    	obj.message = "Restaurent does invariable.";		    			    		    
		    }
		    res.json(obj);
		    res.end();	
		});		
		var callback = function(err, docs){
			if(err){
				obj.err = 1;
		    	obj.message = err.message;		    				 	
			}
			else if( docs ){
				obj.err = 0;
		    	obj.message = "detele success";
		    	obj.docs = docs;			
			}else{

				obj.err = 1;
		    	obj.message = "Error";		    	
			}	
			res.json(obj);
		    res.end();		
		};	
	},





	/** 
		Method POST, Update data by ID
	*/
	update : function( req, res, next ){

		var dataPost = req.body;		
		var resObj = {
			"name": dataPost.res_name,
			"address" : { 
				"street" : dataPost.address_building,
				"building" :  dataPost.address_street,
				"coord" : [dataPost.address_lat , dataPost.address_lng],
				"zipcode" : dataPost.zipcode
			}		
		};
		Restaurent.update({ _id : dataPost._id || 0  }, { $set: resObj }, function(err, restaurent ){			
			res.json(restaurent);
			res.end();
		});
		
	},



	/**
	Details View more 
	*/
	details : function(req, res, next ){
		var id = req.params.id;
		Restaurent.findById({_id : id}, function(err, doc ){
			console.log(doc);
			res.render("client/restaurents/details", { title: "Restaurent Details", restaurent : doc });
			res.end();	
		});		
	},



	test:  function (req, res, next ){
		res.render("client/restaurents/show", { 
			title:"Search Restaurent"
		});
		res.end();
	}
}