//------------EDIT THIS FILE TO INSERT YOUR OWN VIDEO-----------

var mongoClient = require("./dataAccess/mongoClient.js");

mongoClient.connect(function(err, db) {
    insertDocuments(db, function(err, data) {
        console.log(err || data);
        db.close();
    });
});

//function that will insert document in mongodb

var insertDocuments = function(db, callback) {
    //Get video collection
    var collection = db.collection('videos');
    //Insert video
    collection.insertMany([
        //ADD INFORMATION OF YOUR OWN VIDEO FILE
        //VIDEO FILES MUST BE IN UPLOADS FOLDER
        { title: 'Bunny', url: 'video/bunny.mp4', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', type: "video/mp4" },
        
        { title: 'Robot', url: 'video/lego.mp4', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', type: "video/mp4" }
        
    ], function(err, result) {
        console.log("Added documents to the collection")
        callback(result);
    });
};