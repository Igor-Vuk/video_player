var MongoClient = require("mongodb").MongoClient;
// Connection URL
var url="mongodb://localhost:27017/myproject";

var mongoClient = new function() {
    this.connect = function(callback) {
        MongoClient.connect(url, function(err, db) {
            console.log("Connected successfully to server");
            callback(err, db);
        });
    };
};

//exporting the mongoClient function
module.exports=mongoClient;
