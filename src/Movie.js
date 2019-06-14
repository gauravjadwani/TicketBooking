import { client } from "./redisCli";
export default class Movie {
  constructor(movie) {
    this.movie = movie;
  }
  insertMovie(movie) {
    client.set("my test key", "my test value");
  }
}
