// const redis = require("redis");
import redis from "redis";
import { PORT, HOST, DB_PASS } from "./Utilities/constants";

let client = null;
try {
  client = redis.createClient(PORT, HOST);
  client.on("error", function(err) {
    console.log("Error " + err);
  });
  client.auth(DB_PASS, function(err) {
    if (err) throw err;
  });
} catch (e) {
  console.log("redis client error", e);
}

module.exports.client = client;
