'use strict';
const express = require('express');
const app = express();
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sandvic1:M4f6Tvhdh8QhDvKK@opensaucecluster-qfoum.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

app.post('/check', function(req, res) {
    res.send({'message': 'connected!' });
});
app.post('/insert',function(req,res) {
    //console.log(req.body);
    const client = new MongoClient(uri, { useNewUrlParser: true });
     MongoClient.connect(uri, function(err, client) {
         if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
         }
         const collection = client.db("trial_db").collection("trial_collection");
          collection.insertOne(req.body,function(err,res){
              if(err) throw err;
              console.log("inserted");
          });

         client.close();
     });

});