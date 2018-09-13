var path = require("path");

module.exports = function(app) {
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });

  //Default: send user to home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });
};
