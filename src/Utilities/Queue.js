// var kue = require("kue");
import kue from "kue";

export default class Queue {
  constructor() {
    // var redis = {
    //   redis: {
    //     port: 6379,
    //     host: "52.66.197.111",
    //     auth: "foobarq123",
    //     db: 2
    //   }
    // };
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
      .removeOnComplete(true) // REMOVE THE JOB FROM THE QUEUE ONCE IT'S COMPLETED
      .attempts(5) // The maximum number of retries you want the job to have
      .backoff({ delay: 60 * 1000, type: "exponential" }) // Time between retries. Read docs.
      .save(); // PERSIST THE DAMN JOB LOL

    verifyStateJob.on("failed", function(errorMessage) {
      // Huh?
      console.log("Job failed");
      let error = JSON.parse(errorMessage);
      // error now contains the object passed from the worker when the job failed
      console.log(error); // Check it out for yourself
      // call pagerduty or whatever jazz you wanna do in case of failure
    });
  }
}
