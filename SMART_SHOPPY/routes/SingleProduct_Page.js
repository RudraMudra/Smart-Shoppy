var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";


/*Home page */
router.get('/', function(req, res, next){
    // var productId = '';
    var productId = req.query.productId ? req.query.productId : '';
    var data = {"productDescrption" : []};
    mongoClient.connect(dbUrl, (error, client) =>{
        var db = client.db("SMART_SHOPPY");
        var collection = db.collection("getProductDetails");
        
        collection.find({productId : productId}).toArray((error, details) => {
            data.productDescrption = details;
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