// import Movie from "./Movie";

import Movie from "./Movie";
import Hall from "./Hall";
import Queue from "./Utilities/Queue";

import { client } from "./redisCli";
const { promisify } = require("util");
export default class MovieBooking {
  constructor() {
    this.completelyBookedMovie = [];
    this.incompleteMovie = [];
  }
  insertNewMovie(movieName, hallName = "L1", category = "incompletedMovie") {
    let obj = new Movie();
    let res = obj.insertMovie(movieName, hallName, category);
    return res;
  }
  deleteNewMovie(movieName) {
    let newArr = arr.filter(function(ele) {
      return ele != movieName;
    });
    this.completelyBookedMovie.push(movieName);
    return newArr;
  }
  async enquireMovie(movieName) {
    let obj = new Movie();
    let res = await obj.getMoviesList();
    let id = this.persistEnquireDetails(movieName);
    if (res.includes(movieName)) {
      let response = {};
      response.id = id;
      return response;
    } else {
      return false;
    }
  }
  persistEnquireDetails(movieName) {
    let id = parseInt(Math.random() * 10000000000);
    let obj = {
      id: id,
      movieName: movieName,
      paymentStatus: false
    };
    client.hmset("Enquire:" + id, obj);
    return id;
  }
  async bookSeats(noOfSeats, enquireId) {
    //enquireId will be having MovieName
    //MovieName-->MovieDetailsHash -->HallSeats
    const getAsync = promisify(client.hgetall).bind(client);
    let enquireHash = await getAsync("Enquire:" + enquireId);
    let movieName = enquireHash.movieName;
    let movieHash = await getAsync("Movie:" + movieName);
    let hallObj = new Hall();
    let statusAllotedSeats = await hallObj.bookHallSeats(noOfSeats, movieHash);
    if (statusAllotedSeats) {
      let res = {};
      res.id = enquireId;
      res.movieName = enquireHash.movieName;
      res.seatsStatus = "queued";
      res.seats = statusAllotedSeats;
      res.msg = "Waiting for payment";

      //adding it to the Queue

      let customQueue = new Queue();
      customQueue.createQueue(res);
      return res;
    }
    return statusAllotedSeats;
  }
  async processPayment(enquireId) {
    const getAsync = promisify(client.hgetall).bind(client);
    let enquireHash = await getAsync("Enquire:" + enquireId);
    if (enquireHash.paymentStatus == "false") {
      let result = await client.hset(
        "Enquire:" + enquireId,
        "paymentStatus",
        "true",
        function(err, value) {
          if (err) {
            throw err;
          } else {
            console.log("value", value);
          }
        }
      );
      return true;
    }
  }
}
