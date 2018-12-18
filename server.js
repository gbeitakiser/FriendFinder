// Requirements
//================================
var express = require("express");



// Connection Variables
//================================
var app = express();
var PORT = process.env.PORT || 3000;



// Handle Dat Data!
//================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routing
//================================
require("./App/Routing/apiRoutes")(app);
require("./App/Routing/htmlRoutes")(app);



// Start Connection
//================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });