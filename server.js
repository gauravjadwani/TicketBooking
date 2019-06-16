var express = require("express");
// var MovieBooking = require("./src/MovieBooking");
import MovieBooking from "./src/MovieBooking";
var app = express();
try {
  app.get("/insert", async function(req, res) {
    let movie = req.query.movie;
    let hall = req.query.hall;
    let booking = new MovieBooking();
    let status = await booking.insertNewMovie(movie, hall);
    console.log("status", status);
    // MovieBooking.insertNewMovie(movie,hall);
    res.send("fe");
  });
  app.get("/enquire", async function(req, res) {
    let movie = req.query.movie;
    let hall = req.query.hall;
    let booking = new MovieBooking();
    let status = await booking.enquireMovie(movie);
    res.send(status);
  });
} catch (e) {
  console.log(e, "eeee");
}

app.listen(3024);
