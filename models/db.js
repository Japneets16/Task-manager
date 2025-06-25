const mongoose = require("mongoose");

// Use environment variable for MongoDB connection or fallback to provided URL
const mongoURL =
  process.env.MONGODB_URL ||
  "mongodb+srv://jpsingh:jpsingh3205@cluster1.lcrcel4.mongodb.net/taskmanager";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed:", err.message);
  });

module.exports = mongoose;
