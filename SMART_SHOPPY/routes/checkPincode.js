var express = require('express');
var router = express.Router();

var mongoClient = require("mongodb").MongoClient; 
var dbUrl = "mongodb://127.0.0.1:27017";

router.post('/', function(req,res, next){
    var data = {};
    mongoClient.connect(dbUrl, (error, client) =>{
        if(error){
            data.msg = "Error while connecting to db."
        }else{
            var db = client.db("SMART_SHOPPY");
            var collection = db.collection("getPincode");
            var findPincode =  {Pincode: req.body.checkAvailability};
            collection.find(findPincode).toArray((error, result) =>{
                console.log(findPincode);
                console.log(result);
                if(result.length == 1){
                    data.status = 'Success';
                    data.msg = "Delivery available at this Pincode .. ";
                }else{
                    data.status = 'Error';
                    data.msg = "Not a valid Pincode !! try again";
                }
                client.close();
                res.send(JSON.stringify(data));
            });
        }
    })
});

module.exports = router;