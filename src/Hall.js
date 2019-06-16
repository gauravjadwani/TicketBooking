import { charFrequency } from "./Utilities/HelperFunctions";
import { client } from "./redisCli";
export default class Hall {
  constructor(nofSeats, movieAssociated) {
    this.hallMembers = new Array(nofSeats).fill(0);
    this.hallMovie = movieAssociated;
  }
  bookHallSeats(noOfseats, moviehash) {
    let hallSeatsArray = JSON.parse(moviehash.hallSeats);
    console.log("hallSeatsArray", hallSeatsArray, typeof hallSeatsArray);
    let frequency = charFrequency(hallSeatsArray);
    let seatsAlloted = [];

    if (frequency["0"] >= noOfseats) {
      let times = noOfseats;
      for (let i = 0; i < hallSeatsArray.length; i++) {
        if (times > 0 && hallSeatsArray[i] !== 1) {
          hallSeatsArray[i] = 1;
          times--;
          seatsAlloted.push(i);
        }
      }
      let filledArray = this.fillseats(hallSeatsArray, seatsAlloted);
      let update = this.updateSeatsDb(moviehash.name, filledArray);
      console.log("filledArray", filledArray);
      return seatsAlloted;
    } else {
      return false;
    }
  }
  fillseats(hallSeatsArray, seatsAlloted,seatsStatus=1) {
    let arr = hallSeatsArray;
    for (let i = 0; i < seatsAlloted.length; i++) {
      hallSeatsArray[seatsAlloted[i]] = seatsStatus;
    }
    return arr;
  }
  async updateSeatsDb(movieName, seatsArray) {
    let result = await client.hset(
      "Movie:" + movieName,
      "hallSeats",
      JSON.stringify(seatsArray),
      function(err, value) {
        if (err) {
          throw err;
        } else {
          console.log("value", value); // "here the yield"
          // return value;
        }
      }
    );
    return result;
  }
}
