var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";

/*Home page */
router.post('/', function(req, res, next){

    var data = {"msg" : ""};
    mongoClient.connect(dbUrl, (error, client) =>{
        var db = client.db("SMART_SHOPPY");
        var collection = db.collection("productDetails");
        collection.insertOne(req.body, (error) => {
            if(error){
                data.msg = 'Error while inserting data';
            }else{
                data.msg = 'Successfully inserted product details';
            }
            res.send(JSON.stringify(data));
        })
    })
});

module.exports = router;