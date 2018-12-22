// Variables
//===============================
var respondents = require("../Data/friends");

// Holds Cross-File Communication
//===============================
module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
        res.json(respondents);
  });

      //
  app.post("/api/friends", function(req, res) {
    var newUserArr = [];

        // Gets new user's incoming scores and pushes them to array
        //_________________________________________________________
        for (var i = 0; i < req.body.scores.length; i++) {
          newUserArr.push(+req.body.scores[i]);
        };
        

        // Compatability Checker
        //===============================
          var indexOfCompatible;
          var mostCompatibleWith;
          var dbCompatabilityScore = [];
          var checkerSum = [];
        
          // Loops through each person in database and adds their score to empty var. 
          // Then initializes loops for each person that....(see next comment)
          for (var i = 0; i < respondents.length; i++) {
            
            var sum = 0;
            var scoresToCheck;
            var numbersToCheck = [];
          
            scoresToCheck = respondents[i].scores;
        
            // Converts person's scores from strings to integers and places them in new array. Then...
            for (var v = 0; v < scoresToCheck.length; v++) {
              numbersToCheck.push(parseInt(scoresToCheck[v]));
            }
        
            // Compares each number in new user score to each number in score of selected user
            for (var x = 0; x < newUserArr.length; x++) {
              var newNumber = 0;
              newNumber = Math.abs(numbersToCheck[x] - newUserArr[x]);
              checkerSum.push(newNumber);
            }
          

            // Sums everything in var checkerSum and gives compatability score. The lower it is, the more compatable
            for (var c = 0; c < checkerSum.length; c++) {
              sum += checkerSum[i];

            }
            dbCompatabilityScore.push(sum);         
          }

          indexOfSmallest(dbCompatabilityScore);

          // Checks lowest number in dbCompatabilityScore Array and returns its index
          function indexOfSmallest(a) {
            var lowest = 0;
            for (var i = 1; i < a.length; i++) {
              if (a[i] < a[lowest]) lowest = i;
            }
            indexOfCompatible = lowest;

            mostCompatibleWith = respondents[indexOfCompatible];
            console.log("You're most compatible with: ");
            console.log(mostCompatibleWith);
          }


        // Adds respondent data to respondents array in friends.js and sends it to survey.html
        respondents.push(req.body);
        res.send(mostCompatibleWith);
  });
};

