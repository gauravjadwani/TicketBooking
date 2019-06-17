// const redis = require("redis");
import {
  REDIS_USER_DATA_INDEX,
  PORT,
  HOST,
  DB_PASS
} from "./src/Utilities/constants";
// import redis from "redis";
// // import { REDIS_USER_DATA_INDEX, PORT, HOST } from "./Utilities/constants";

// // const http = require("http");
// try {
//   var redisClient = redis.createClient("6373", "13.232.20.86");
// } catch (e) {
//   console.log("fff", e);
// }

// redisClient.select(REDIS_USER_DATA_INDEX);

// module.exports.client = redisClient;
var redis = require("redis");
var client = redis.createClient(6379, HOST);
client.on("error", function(err) {
  console.log("Error " + err);
});
// client.auth(DB_PASS);
client.auth("foobarq123", function(err) {
  if (err) throw err;
});

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function(err, replies) {
  console.log(replies.length + " replies:");
  replies.forEach(function(reply, i) {
    console.log("    " + i + ": " + reply);
  });
  client.quit();
});
