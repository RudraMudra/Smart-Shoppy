var express = require('express');
var router = express.Router();

var mongoClient = require("mongodb").MongoClient; 
var dbUrl = "mongodb://127.0.0.1:27017";

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


/* GET home page. */
router.post('/', function(req, res, next) {
  var data = {msg: ' ', status: 'Error'};
  mongoClient.connect(dbUrl, (error, client) => {
    if(error){
      data.msg = "Error while connecting to db.";
    }else{
      var db = client.db("SMART_SHOPPY");
      var collection = db.collection("userAccountDetails");
      var findQuery = {$or: [{accountId: req.body.accountId}, {mailId: req.body.mailId}]};
      collection.find(findQuery).toArray((error, result) => {
        if(result.length >=1){
          data.msg = 'Error'
          data.msg = "Account already exists";
          client.close();
          res.send(JSON.stringify(data));
        }else{
          bcrypt.hash(req.body.accountPwd, saltRounds, function(err, hash){
            req.body.accountPwd = hash;
            collection.insertOne(req.body, (error) =>{
              if(error){
                data.msg = "Error while inserting data";
                data.status = "Error";
              }else{
                data.msg = "Successfully user got registered";
                data.status = 'Success';
              }
              client.close();
              res.send(JSON.stringify(data));
            });
          }); 
        }
      });
    } 
  });
});

module.exports = router;