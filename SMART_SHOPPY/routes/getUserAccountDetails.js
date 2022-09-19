var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient; 
var dbUrl = "mongodb://127.0.0.1:27017";

/* Get home page. */
router.get('/', function(req, res, next) {
    // res.writeHead(200,{'Content-type:': 'text/JSON'});
   mongoClient.connect(dbUrl, (error, client) => {
    // res.statusCode = 200;
    // res.setHeader('Content-type', 'text/JSON');
    var db = client.db("SMART_SHOPPY");
    var collection = db.collection("userAccountDetails");
    collection.find({}).toArray((error, details) => {
        var data = {userAccountDetails: details};
        client.close();
        res.send(JSON.stringify(data));
    })
   });
  });

  module.exports = router;