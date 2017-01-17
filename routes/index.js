var fs = require("fs"),
    express = require("express"),
    router = express.Router(),
    path = require("path"),
    mongo = require("../dataAccess/mongoClient.js");


//Get a list of videos
router.get("/list", function(req, res) {
    mongo.connect(function(err, db) {
        if(err) {
            //if error happens while connecting to db
            //code 500 internal server error
            res.json({
               success: false, message: "Could not retrieve video list", code: 500, data: [] 
            });
        } else {
            // select video collection
            var collection = db.collection('videos');
            // find list of all avaialble videos
            collection.find().toArray(function (err, list) {
                console.log("Found the following records");
                //console.log(list);
                res.json({
                    //send main list of videos
                    success: true, message: 'OK', code: 200, data: list 
                });
            });
        }
    });
});

    
//Main route to stream video

router.get("/:path", function(req, res) {
    
    console.log(req.params.path);
//    First we process the range header to get the start/end position. 
//    Then we use fs.stat to get the size of the file without reading the whole file into memory. 
//    Finally, use fs.createReadStream to send the requested part to the client.
    
    var _path = path.join(__dirname, "../uploads" + "/" + req.params.path);
    var ext = (_path).slice(_path.length - 3, _path.length); //getting extension
    var stat = fs.statSync(_path);
    var total = stat.size;
    if(req.headers["range"]) {
        //getting range from request headers
        var range = req.headers.range;
        console.log(range);
        //making array and saving first and last byte to variable
        //calculating chunk size start/end
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];
        
        var start = parseInt(partialstart, 10);
        //if last byte position is not present then it is last byte of video file
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;
        console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
        //include start and end values to read a range of bytes from the file instead of the entire file
        var file = fs.createReadStream(_path, { start: start, end: end });
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/' + ext });
        file.pipe(res);
    } else {
        //otherwise open a read stream 
        console.log('ALL: ' + total);
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/' + ext });
        fs.createReadStream(_path).pipe(res);
    }
});


module.exports = router;