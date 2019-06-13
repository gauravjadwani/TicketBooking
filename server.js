var express = require("express");
var app = express();
try {
  app.get("/enquire", function(req, res) {
    let movie = req.query.movie;
    let hall = req.query.hall;
    res.send("Hello world!" + movie + hall);
  });
} catch (e) {
  console.log(e, "eeee");
}

app.listen(3022);
