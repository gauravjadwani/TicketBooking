// const redis = require("redis");
import redis from "redis";
import {
  REDIS_USER_DATA_INDEX,
  PORT,
  HOST,
  DB_PASS
} from "./Utilities/constants";

// const http = require("http");
try {
  let obj = {
    port: PORT,
    host: HOST,
    password: DB_PASS
  };
  console.log("redis", obj);
  var client = redis.createClient(6379, HOST);
  client.on("error", function(err) {
    console.log("Error " + err);
  });
  // client.auth(DB_PASS);
  client.auth(DB_PASS, function(err) {
    if (err) throw err;
  });
} catch (e) {
  console.log("Error", e);
}

module.exports.client = client;
