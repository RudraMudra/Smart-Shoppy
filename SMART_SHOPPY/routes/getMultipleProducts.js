var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";


router.get('/', function(req,res,next){
    var product_Type = req.query.product_Type ? req.query.product_Type : '';
    var data = {
        "multipleProductsList" : []
    };
    mongoClient.connect(dbUrl, (error, client) =>{
        var db = client.db("SMART_SHOPPY");
        var collection = db.collection("multipleProductsList");
        collection.find({product_Type : product_Type}).toArray((error, details) =>{
            data.multipleProductsList = details;
            console.log(details);
            if(details){
                data.msg = 'valid';
            }else{
                data.msg = 'Invalid';
            }
            res.send(JSON.stringify(data));
        })
    })
})
module.exports = router;