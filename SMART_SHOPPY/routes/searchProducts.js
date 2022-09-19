var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://127.0.0.1:27017';


/* GET home page. */
router.post('/', function(req, res, next) {
    var searchText = req.body.searchText ? req.body.searchText : '';
    console.log(searchText)
    var prodcutDetails = {
        details: []
    }
    mongoClient.connect(dburl, (error, client) =>{
        var db = client.db("SMART_SHOPPY");
        var collection = db.collection("multipleProductsList");
        var Products ;
        if(searchText == ''){
            Products = {};
        }else{
            Products = {Product_Name: {$regex: new RegExp(searchText, 'gi')}}
        }
        collection.find(Products).toArray((error, prod_Data) =>{
            // prodcutDetails.details = prod_Data;
            prodcutDetails.details = prod_Data;
            console.log(prod_Data);
            if(prod_Data){
                prodcutDetails.msg = 'valid';
            }else{
                prodcutDetails.msg = 'Invalid';
            }
            res.send(JSON.stringify(prodcutDetails));
        })
    })
});

module.exports = router;