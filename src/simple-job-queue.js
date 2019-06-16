var kue = require("kue");
var redis = {
  redis: {
    port: 6379,
    host: "52.66.197.111",
    auth: "foobarq123",
    db: 2
  }
};
var jobs = kue.createQueue(redis);

function newJob() {
  var job = jobs.create("new_job");
  console.log("new job created");
  job.save();
}

jobs.process("new_job", function(job, done) {
  console.log("Job", job.id, "is done");
  done && done();
});

setInterval(newJob, 3000);
