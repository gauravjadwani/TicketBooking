// var kue = require("kue");
import kue from "kue";
import Hall from "./../Hall";
import { client } from "./../redisCli";
const { promisify } = require("util");

let customQueue = kue.createQueue({
  prefix: "q",
  redis: {
    port: 6379,
    host: "52.66.197.111",
    auth: "foobarq123",
    db: 2
  }
});
customQueue.process("stateUpdater", 5, (job, done) => {
  tasker(job, done);
});
async function tasker(job, done) {
  const getAsync = promisify(client.hgetall).bind(client);
  let enquireId = job.data.id;
  let enquireHash = await getAsync("Enquire:" + enquireId);
  console.log("enquireHash.paymentStatus", enquireHash.paymentStatus);
  if (enquireHash.paymentStatus == "false") {
    let movieName = job.data.movieName;
    console.log("movieName", movieName);
    let movieHash = await getAsync("Movie:" + movieName);
    console.log("movieHash", movieHash);

    let seatsAlloted = job.data.seats;
    let seatsArray = JSON.parse(movieHash.hallSeats);

    let hallObj = new Hall();
    // hallSeatsArray, seatsAlloted,
    let statusAllotedSeats = await hallObj.fillseats(
      seatsArray,
      seatsAlloted,
      0
    );
    let updatedSeatsStatus = await hallObj.updateSeatsDb(
      movieName,
      statusAllotedSeats
    );
    console.log("worker tasker if", updatedSeatsStatus);
  }
  done && done();
  console.log("worker checkstate else", job.data);
}
