const mongoose = require("mongoose");

// Use environment variable for MongoDB connection or fallback to provided URL
const mongoURL =
  process.env.MONGODB_URL ||
  "mongodb+srv://jpsingh:jpsingh3205@cluster1.lcrcel4.mongodb.net/taskmanager";

// Set mongoose options for better connection handling
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });
    console.log("Database is connected successfully");
    return conn;
  } catch (err) {
    console.log("Database connection failed:", err.message);
    console.log(
      "The app will continue to run, but database operations may fail",
    );
    // Don't exit the process, let the app continue
    return null;
  }
};

// Connect to database
connectDB();

module.exports = mongoose;
