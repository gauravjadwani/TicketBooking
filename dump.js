// const redis = require("redis");
import redis from "redis";
// import { REDIS_USER_DATA_INDEX, PORT, HOST } from "./Utilities/constants";

// const http = require("http");
try {
  var redisClient = redis.createClient("6373", "13.232.20.86");
} catch (e) {
  console.log("fff", e);
}

// redisClient.select(REDIS_USER_DATA_INDEX);

// module.exports.client = redisClient;
