// Variables
//===============================
var respondents = require("../Data/friends");
var newUserArr = [];

// Holds Cross-File Communication
//===============================
module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(respondents);
      });

      //
      app.post("/api/friends", function(req, res) {

        // Gets new user's incoming scores and pushes them to array
        //_________________________________________________________
        for (var i = 0; i < req.body.scores.length; i++) {
          newUserArr.push(+req.body.scores[i]);
        };
        //
        ////
        //////
              // Tie index of matched with data for that person
        //////
        ////
        //

        // Compatability Checker
        //===============================
          var dbCompatabilityScore = [];
        
          // Loops through each person in database and adds their score to empty var. 
          // Then initializes loops for each person that....(see next comment)
          for (var i = 0; i < respondents.length; i++) {
            var checkerSum = [];
            var sum = 0;
            var scoresToCheck;
            var numbersToCheck = [];
          
            scoresToCheck = respondents[i].scores;
        
            // Converts person's scores from strings to integers and places them in new array. Then...
            for (var v = 0; v < scoresToCheck.length; v++) {
              numbersToCheck.push(parseInt(scoresToCheck[v]));
            }
        
            // Compares each number in new user score to each number in score of selected user
            // Number in x < (number) must reflect number of questions OR ELSE!!!
            for (var x = 0; x < 2; x++) {
              var newNumber;
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
            console.log("\n index of? lowest number:")
            console.log(lowest) ;
          }
          console.log("\nCompatability Scores: ")
          console.log(dbCompatabilityScore);
          

        // Adds respondent data to respondents array in friends.js
        respondents.push(req.body);
          res.json(true); // Will this be true or false? And why do I need it?
      });
};

// 7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
//    * The modal should display both the name and picture of the closest match.


