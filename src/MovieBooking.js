// import Movie from "./Movie";

import Movie from "./Movie";
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
    let id = Math.random() * 10000000000;
    let obj = {
      id: id,
      movieName: movieName
    };
    client.hmset("Enquire:" + id, obj);
    return id;
  }
  bookSeats(enquireId) {
    let id = Math.random() * 10000000000;
    let obj = {
      id: id,
      movieName: movieName
    };
    client.hmset("Enquire:" + id, obj);
    return id;
  }
  processPayment() {
    h;
  }
}
// let a = new MovieBooking();
// a.insertNewMovie("hanumdsdsdsan");
