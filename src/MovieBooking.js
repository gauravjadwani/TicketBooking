// import Movie from "./Movie";

import Movie from "./Movie";
import Hall from "./Hall";

import { client } from "./redisCli";
const { promisify } = require("util");
export default class MovieBooking {
  constructor() {
    this.completelyBookedMovie = [];
    this.incompleteMovie = [];
  }
  insertNewMovie(movieName, hallName = "L1", category = "incompletedMovie") {
    // let M = new Movie(movieName);
    // this.incompleteMovie.push(M);
    // console.log("test 2");
    let obj = new Movie();
    // console.log("before MoovieBooking");
    let res = obj.insertMovie(movieName, hallName, category);
    // console.log("after MoovieBooking", res);
    return res;
    // client.set("my test key", "my test value", redis.print);
  }
  deleteNewMovie(movieName) {
    let newArr = arr.filter(function(ele) {
      return ele != movieName;
    });
    this.completelyBookedMovie.push(movieName);
    return newArr;
  }
  async enquireMovie(movieName) {
    // console.log("test 2");
    let obj = new Movie();
    // console.log("before MoovieBooking");
    console.log("0");
    let res = await obj.getMoviesList();
    let id = this.persistEnquireDetails(movieName);

    console.log("ppppppppppp", id);
    if (res.includes(movieName)) {
      let response = {};
      response.id = id;
      return response;
    } else {
      return false;
    }

    // console.log("6");
    // console.log("res", Array.isArray(res));
    // return res;
    // let status = false;
    // let movieObject = null;
    // //searching for the movie in Incompletly filled movies
    // for (let i = 0; i < this.incompleteMovie.length; i++) {
    //   if (this.incompleteMovie[i] === movieName) {
    //     movieObject = this.incompleteMovie[i];
    //     break;
    //   }
    // }
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
    // let result = await client.smembers("incompletedMovie", function(
    //   err,
    //   value
    // ) {
    //   if (err) {
    //     throw err;
    //   } else {
    //     console.log("3");
    //     console.log("value", value); // "here the yield"
    //     return value;
    //   }
    // });
    let enquireHash = await getAsync("Enquire:" + enquireId);
    let movieName = enquireHash.movieName;
    let movieHash = await getAsync("Movie:" + movieName);
    let hallObj = new Hall();
    let statusAllotedSeats = await hallObj.bookHallSeats(noOfSeats, movieHash);
    console.log(enquireHash, movieHash);
    console.log("statusAllotedSeats", statusAllotedSeats);
    if (statusAllotedSeats) {
      let res = {};
      res.id = enquireId;
      res.movieName = enquireHash.movieName;
      res.seatsStatus = "queued";
      res.seats = statusAllotedSeats;
      res.msg = "Waiting for payment";
      return res;
    }
    return statusAllotedSeats;
    // let id = Math.random() * 10000000000;
    // let obj = {
    //   id: id,
    //   movieName: movieName
    // };
    // client.hmset("Enquire:" + id, obj);
    // return id;
  }
  processPayment() {
    h;
  }
}
// let a = new MovieBooking();
// a.insertNewMovie("hanumdsdsdsan");
