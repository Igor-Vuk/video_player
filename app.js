var express = require("express"),
    app     = express();

//requring routes
var routes = require('./routes/index.js');

//specify public to serve static content
app.use(express.static(__dirname + '/public'));


app.use("/video", routes);



app.listen(3000, function() {
    console.log("Server started")
});