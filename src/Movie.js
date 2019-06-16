import { client } from "./redisCli";
const { promisify } = require("util");
import moment from "moment";

export default class Movie {
  // constructor(movie) {
  //   this.movie = movie;
  // }
  async insertMovie(movie, hallName, category) {
    // console.log("async insertMovie init", movie);
    let result;
    let movieDetails = {};
    movieDetails.name = movie;
    movieDetails.hall = hallName;
    movieDetails.timeInsertedAt = moment().unix();
    movieDetails.hallSeats = JSON.stringify(new Array(50).fill(0));
    


    console.log("test 3", movieDetails);
    // return null;
    try {
      // console.log(client);
      // console.log("start insertMovie");
      console.log("test 4");
      result = await client.sadd(category, movie, function(err, value) {
        if (err) {
          throw err;
        } else {
          console.log("value", value); // "here the yield"
          // return value;
        }
      });
      result = await client.hmset("Movie:" + movie, movieDetails, function(
        err,
        value
      ) {
        if (err) {
          throw err;
        } else {
          console.log("value", value); // "here the yield"
          // return value;
        }
      });
      console.log("test 5", result);
      // console.log("after insertMovie", result, typeof result);
      // console.log("async insertMovie came", result);
    } catch (e) {
      console.log("feefe", e);
    }
    return result;
  }
  async getMoviesList(category = "incompletedMovie") {
    // console.log("test 3");
    // console.log("async insertMovie init", movie);
    let result;
    try {
      // console.log(client);
      console.log("1");
      let q = await this.getdata();
      console.log("5", q);
      return q;
      // result = client.smembers(category);
      // console.log("getmo".result);
      // return result;
      // console.log("test 5", result);
      // console.log("after insertMovie", result, typeof result);
      // console.log("async insertMovie came", result);
    } catch (e) {
      // console.log("feefe", e);
    }
    return result;
  }
  async getdata() {
    console.log("2");
    const getAsync = promisify(client.smembers).bind(client);
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
    let result = await getAsync("incompletedMovie");
    // let result = await client.smembers("incompletedMovie");
    // result.then(function(value) {
    //   console.log("3");
    //   console.log(value);
    // });
    console.log("4", result);
    // var promise1 = Promise.resolve(result);
    // console.log(promise1);
    return result;
  }
  getMovieDetails(movieName) {}
}
// let m = new Movie();
// m.insertMovie("df");
