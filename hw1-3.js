var express = require('express')
var mongo = require('mongodb');
var app = express();

var db, dbconn;
db = mongo.connect("mongodb://localhost:27017/m101?safe=true", function(err, conn) {
    conn.on('error', function(err) {
        return console.log('%s: Mongo connect error %s',Date(Date.now() ), err);}
    );
    dbconn = conn;
});

function find_number(req, resp){

    var n = parseInt(req.param("n"));

    dbconn.collection("funnynumbers").find({}).skip(n).limit(1).sort({"value":1}).toArray(function(err,doc){
        if (err){
            console.err("Error trying to read collection:"+err);
        }
        else {
            resp.send(doc[0].value.toString()+"\r\n");
        }

    });
}

app.get('/hw1/:n', find_number);
app.listen(8080);
console.log('Express listening on port 8080');