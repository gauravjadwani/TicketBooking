import { client } from "./redisCli";
const { promisify } = require("util");
import moment from "moment";

export default class Movie {
  async insertMovie(movie, hallName, category) {
    // console.log("async insertMovie init", movie);
    let result;
    let movieDetails = {};
    movieDetails.name = movie;
    movieDetails.hall = hallName;
    movieDetails.timeInsertedAt = moment().unix();
    movieDetails.hallSeats = JSON.stringify(new Array(50).fill(0));

    try {
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
    } catch (e) {
      console.log("insertMovie Error", e);
    }
    return result;
  }
  async getMoviesList(category = "incompletedMovie") {
    let result;
    try {
      let q = await this.getdata();
      return q;
    } catch (e) {
      console.log("getMoviesList Error", e);
    }
    return result;
  }
  async getdata() {
    const getAsync = promisify(client.smembers).bind(client);
    let result = await getAsync("incompletedMovie");
    return result;
  }
  getMovieDetails(movieName) {}
}
