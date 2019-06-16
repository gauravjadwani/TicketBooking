// var kue = require("kue");
import kue from "kue";

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
  checkState(job, done);
});
function checkState(job, done) {
  console.log("worker checkstate", job.data.id, job.data.l);
}
// class Worker {
//   constructor() {
//     // var redis = {
//     //   redis: {
//     //     port: 6379,
//     //     host: "52.66.197.111",
//     //     auth: "foobarq123",
//     //     db: 2
//     //   }
//     // };
//     this.customQueue = kue.createQueue({
//       prefix: "q",
//       redis: {
//         port: 6379,
//         host: "52.66.197.111",
//         auth: "foobarq123",
//         db: 2
//       }
//     });
//     // let queue = kue.createQueue({
//     //   redis: {
//     //     host: localhost,
//     //     port: 6379
//     //   }
//     // });

//     // Assign worker to process a job of particular type
//     // 5 is the maximum number of concurrent jobs our worker will pick up.
//     // Can be more if you want it to be. Can be less. Figure out your case and load.
//   }
//   process(data) {
//     this.customQueue.process("stateUpdater", 5, (job, done) => {
//       this.checkState(job, done);
//     });
//   }
//   checkState(job, done) {
//     console.log("worker checkstate", job);
//   }
// }
