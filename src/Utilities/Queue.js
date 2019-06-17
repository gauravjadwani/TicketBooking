import {
  USER_SESSION_EXPIRE_TIME,
  PORT,
  HOST,
  DB_PASS,
  REDIS_USER_DATA_INDEX_QUEUE,
  NO_OF_WORKERS_ATTEMPTS
} from "./constants";
import kue from "kue";

export default class Queue {
  constructor() {
    this.customQueue = kue.createQueue({
      prefix: "q",
      redis: {
        port: PORT,
        host: HOST,
        auth: DB_PASS,
        db: REDIS_USER_DATA_INDEX_QUEUE
      }
    });
  }
  createQueue(data) {
    const verifyStateJob = this.customQueue
      .create("stateUpdater", data)
      .delay(USER_SESSION_EXPIRE_TIME)
      .removeOnComplete(true)
      .attempts(NO_OF_WORKERS_ATTEMPTS)
      .backoff({ delay: 60 * 1000, type: "exponential" })
      .save();

    verifyStateJob.on("failed", function(errorMessage) {
      console.log("Job failed");
      let error = JSON.parse(errorMessage);
      console.log(error);
    });
  }
}
