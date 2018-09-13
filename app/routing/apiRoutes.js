var path = require("path");

var friendsVariable = require("../data/friends.js");

module.exports = function(app) {
  // Get our friends object from friends.js
  app.get("/api/friends", function(req, res) {
    res.json(friendsVariable);
  });

  // Get userInput and find the closest friend by matching/comparing scores and difference
  app.post("/friends", function(req, res) {
    var userInputScores = req.body.scores;
    var userInputScoresArray = [];
    var friendMatch = 0;

    for (var i = 0; i < friendsVariable.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < userInputScores.length; j++) {
        totalDifference += Math.abs(
          parseInt(friendsVariable[i].scores[j]) - parseInt(userInputScores[j])
        );
      }
    }

    userInputScoresArray.push(totalDifference);

    //after all comparision is done, find best match
    for (var i = 0; i < userInputScoresArray.length; i++) {
      if (userInputScoresArray[i] <= userInputScoresArray[friendMatch]) {
        friendMatch = i;
      }
    }

    //return friendMatch data
    var bestFriend = friendsVariable[friendMatch];
    res.json(bestFriend);

    //pushes new submission into the friendsList array/database
    friendsVariable.push(req.body);
  });
};
