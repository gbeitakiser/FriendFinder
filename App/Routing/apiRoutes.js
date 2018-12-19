
var respondants = require("../Data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(respondants);
      });


      app.post("/api/friends", function(req, res) {
        
        respondants.push(req.body);
          res.json(true); // Will this be true or false?
          // Then add function for compatability logic
      });
};