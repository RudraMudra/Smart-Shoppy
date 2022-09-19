var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.post('/', function(req, res, next) {

    console.log(req.query); // get the data been passed by user through GET method
    console.log(req.body); // get the data been passed by user through POST method
    var data = {};

    mongoClient.connect(dbUrl, (error, client) => {
        if(error){
            console.log(error);
            data.msg = "Error while connecting to DB";
        }else{
            var db = client.db("SMART_SHOPPY");
            var collection = db.collection("userAccountDetails");
            var query = {accountId: req.body.userId};
            console.log(query);
            collection.find(query).toArray((error, details) => {
                console.log("details");
                console.log(details);
                if(details.length == 1){
                    bcrypt.compare(req.body.actPwd, details[0].accountPwd).then(function
                    (result){
                        if(result){ // true
                            req.session.isUserLoggedin = true;
                            req.session.isAdmin = false;
                            data.msg = 'valid';
                            if(details[0].isAdmin){
                                data.isAdmin = true;
                                req.session.isAdmin = true;
                            }
                        }else{ // false
                            req.session.isUserLoggedin = false;
                            req.session.isAdmin = false;
                            data.msg = 'Invalid';
                        }
                        client.close();
                        res.send(JSON.stringify(data));
                    });  
                }  else{
                    req.session.isUserLoggedin = false;
                    data.msg = 'Invalid';
                    res.send(JSON.stringify(data)); 
                }
            });
        }
    });
});

module.exports = router; 