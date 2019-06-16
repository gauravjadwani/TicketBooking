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

  // var redisClient = redis.createClient(PORT, HOST);
  // redisClient.auth(DB_PASS);
  // redisClient.on("error", function(err) {
  //   console.log("Error " + err);
  // });

  // redisClient.on("error", function(err) {
  //   console.log("Error " + err);
  // });
  // // client.auth(DB_PASS);
  // redisClient.auth("foobarq123", function(err) {
  //   if (err) throw err;
  // });
  // redisClient.set("trttr", "stringval", redis.print);

  // var redis = require("redis");
  var client = redis.createClient(6379, HOST);
  client.on("error", function(err) {
    console.log("Error " + err);
  });
  // client.auth(DB_PASS);
  client.auth(DB_PASS, function(err) {
    if (err) throw err;
  });

  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });

  // client.set("string gaurav", "string val", redis.print);
  // console.log("dw", redisClient.get("name"));
  // redisClient.set("named", "ccs", (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("ef", data);
  // });
  // redisClient.select(REDIS_USER_DATA_INDEX);
  // redisClient.auth(DB_PASS);
} catch (e) {
  console.log("ffdwdwdwdwdwdwdwwf", e);
}

module.exports.client = client;
