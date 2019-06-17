import { USER_SESSION_EXPIRE_TIME } from "./constants";
import kue from "kue";

export default class Queue {
  constructor() {
    this.customQueue = kue.createQueue({
      prefix: "q",
      redis: {
        port: 6379,
        host: "52.66.197.111",
        auth: "foobarq123",
        db: 2
      }
    });
  }
  createQueue(data) {
    const verifyStateJob = this.customQueue
      .create("stateUpdater", data)
      .delay(6000)
      .removeOnComplete(true)
      .attempts(5)
      .backoff({ delay: 60 * 1000, type: "exponential" })
      .save();

    verifyStateJob.on("failed", function(errorMessage) {
      console.log("Job failed");
      let error = JSON.parse(errorMessage);
      console.log(error);
    });
  }
}
