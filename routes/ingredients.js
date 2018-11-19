var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";



var addIngredientDetails = function(req, res, next) {
    console.log("Ingredients Details Add");
    var cookId = req.body.cookId;
    res.setHeader("Content-Type", "application/json");
    responseData = {}
    mongoc.connect(mongoUrl, function(err, db) {
        if(err) throw err;
        var dbo = db.db("piggy");
        var query = req.body;
        dbo.collection("Ingredients").insertOne(query, function(err, dbResult){
            if(err) {
                responseData["ok"] = 0;
                res.send(JSON.stringify(responseData));
                throw err;
            }
            console.log("Ingredient Details Added");
            responseData["ok"] = 1;
            res.send(JSON.stringify(responseData));
            console.log("----------\n");
        });
    });
}


var getNIngredients = function(req, res, next) {
	var dish_name = req.body.dish_name;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"dish_name": dish_name
		};
		dbo.collection("Ingredients").find(query).toArray(function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Dish Name : ", dbResult.dish_name);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Cook with Id ${dish_name} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}