var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";

/*Home page */
router.get('/', function(req, res, next){

    var data = {"productDetailsList" : []};
    mongoClient.connect(dbUrl, (error, client) =>{
        var db = client.db("SMART_SHOPPY");
        var collection = db.collection("productDetails");
        collection.find({}).toArray((error, details) => {
            data.productDetailsList = details;
            res.send(JSON.stringify(data));
        })
    })
});

module.exports = router;