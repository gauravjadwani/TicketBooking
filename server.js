// var express = require("express");
import express from "express";
import MovieBooking from "./src/MovieBooking";
let app = express();
try {
  app.get("/insert", async function(req, res) {
    let movie = req.query.movie;
    let hall = req.query.hall;
    if (movie && hall) {
      let booking = new MovieBooking();
      let status = await booking.insertNewMovie(movie, hall);
      console.log("status", status);
      let message = {
        data: "Record Successfully Created"
      };
      res.send(JSON.stringify(message));
    } else {
      res.status(400);
      res.send("None shall pass");
    }

    // MovieBooking.insertNewMovie(movie,hall);
  });
  app.get("/enquire", async function(req, res) {
    let movie = req.query.movie;
    if (movie) {
      let booking = new MovieBooking();
      let status = await booking.enquireMovie(movie);
      res.send(status);
    } else {
      res.status(400);
      res.send("None shall pass");
    }
  });
  app.get("/bookSeats", async function(req, res) {
    let noOfSeats = req.query.noofseats;
    let enquireId = req.query.enquireid;
    if (noOfSeats && enquireId) {
      let booking = new MovieBooking();
      let status = await booking.bookSeats(noOfSeats, enquireId);
      res.send(status);
    } else {
      res.status(400);
      res.send("None shall pass");
    }
  });
  app.get("/processPayment", async function(req, res) {
    let enquireId = req.query.enquireid;
    if (enquireId) {
      let booking = new MovieBooking();
      let status = await booking.processPayment(enquireId);
      res.send(status);
    } else {
      res.status(400);
      res.send("None shall pass");
    }
  });
} catch (e) {
  console.log(e, "eeee");
}

app.listen(3024);
