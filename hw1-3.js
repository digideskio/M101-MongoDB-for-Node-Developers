var express = require('express')
var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var app = express();

var url, db, dbconn;
url = "mongodb://localhost:27017/m101?safe=true";

db = mongo.connect(url, function(err, conn) {

    conn.on('error', function(err) {
        return console.log('%s: Mongo connect error %s',Date(Date.now() ), err);});
    dbconn = conn;
});

function find_number(request, response){

    var n = parseInt(request.param("n"));

    dbconn.collection("funnynumbers").find({}).skip(n).limit(1).sort({"value":1}).toArray(function(err,doc){
        if (err){
            console.err("Error trying to read collection:"+err);
        }
        else {
            response.send(""+doc[0].value+"\r\n");
        }

    });
}

app.get('/hw1/:n', find_number);

app.listen(8080);
console.log('Express listening on port 8080');