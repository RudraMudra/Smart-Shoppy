var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";


router.get('/', function(req,res,next){
    var ScreenSize = req.query.ScreenSize ? req.query.ScreenSize : '';
    console.log(ScreenSize)
    var data = {
        ScreenSize : []
    }
    mongoClient.connect(dbUrl, (error, client) =>{
        var db = client.db("SMART_SHOPPY");
        var collection = db.collection("multipleProductsList");
        collection.find({ScreenSize : ScreenSize}).toArray((error, details) =>{
            data.ScreenSize = details;
            console.log(details);
            if(details){
                data.msg = 'valid';
            }else{
                data.msg = 'Invalid';
            }
            res.send(JSON.stringify(data));
        })
    })
});
module.exports = router;