var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var url, dbconn, magic, item, x;

url = "mongodb://localhost:27017/m101?safe=true";

db = mongo.connect(url, function(err, conn) {
    conn.on('error', function(err) {
        return console.log('%s: Mongo connect error %s',Date(Date.now() ), err);});
    dbconn = conn;
    find_numbers();
});

function find_numbers(){

    dbconn.collection("funnynumbers").find({}).toArray(function(err,doc){
        magic = 0;
        if (err){
            console.err("Error trying to read collection:"+err);
        }

        else {
            for(x=0; x< doc.length; x++){
                item = doc[x];
                if ((item.value % 3) == 0){
                    magic += item.value;
                }
            }

            console.log("The answer to Homework One, Problem 2 is " + magic);
        }


    });
}