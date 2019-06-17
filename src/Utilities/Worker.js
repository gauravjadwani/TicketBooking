import kue from "kue";
import Hall from "./../Hall";
import { client } from "./../redisCli";
import { promisify } from "util";
import {
  PORT,
  HOST,
  DB_PASS,
  REDIS_USER_DATA_INDEX_QUEUE,
  NO_OF_WORKERS
} from "./constants";

let customQueue = kue.createQueue({
  prefix: "q",
  redis: {
    port: PORT,
    host: HOST,
    auth: DB_PASS,
    db: REDIS_USER_DATA_INDEX_QUEUE
  }
});
customQueue.process("stateUpdater", NO_OF_WORKERS, (job, done) => {
  tasker(job, done);
});
async function tasker(job, done) {
  const getAsync = promisify(client.hgetall).bind(client);
  let enquireId = job.data.id;
  let enquireHash = await getAsync("Enquire:" + enquireId);
  if (enquireHash.paymentStatus == "false") {
    let movieName = job.data.movieName;
    let movieHash = await getAsync("Movie:" + movieName);
    let seatsAlloted = job.data.seats;
    let seatsArray = JSON.parse(movieHash.hallSeats);
    let hallObj = new Hall();
    let statusAllotedSeats = await hallObj.fillseats(
      seatsArray,
      seatsAlloted,
      0
    );
    let updatedSeatsStatus = await hallObj.updateSeatsDb(
      movieName,
      statusAllotedSeats
    );
  }
  done && done();
}
