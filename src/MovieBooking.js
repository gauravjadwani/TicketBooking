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
    Movie.insertMovie(movieName);
    // client.set("my test key", "my test value", redis.print);
  }
  deleteNewMovie(movieName) {
    let newArr = arr.filter(function(ele) {
      return ele != movieName;
    });
    this.completelyBookedMovie.push(movieName);
    return newArr;
  }
  enquireMovie(movieName, Hal) {
    let status = false;
    let movieObject = null;
    //searching for the movie in Incompletly filled movies
    for (let i = 0; i < this.incompleteMovie.length; i++) {
      if (this.incompleteMovie[i] === movieName) {
        movieObject = this.incompleteMovie[i];
        break;
      }
    }
  }
  processPayment() {
    h;
  }
}
