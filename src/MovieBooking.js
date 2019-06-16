// import Movie from "./Movie";

import Movie from "./Movie";
export default class MovieBooking {
  constructor() {
    this.completelyBookedMovie = [];
    this.incompleteMovie = [];
  }
  insertNewMovie(movieName) {
    // let M = new Movie(movieName);
    // this.incompleteMovie.push(M);
    console.log("test 2");
    let obj = new Movie();
    // console.log("before MoovieBooking");
    let res = obj.insertMovie(movieName);
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
    console.log("6");
    console.log("res", res);
    return res;
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
  processPayment() {
    h;
  }
}
// let a = new MovieBooking();
// a.insertNewMovie("hanumdsdsdsan");
