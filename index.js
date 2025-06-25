const express = require("express");
const app = express();

// Load environment variables if .env file exists
try {
  require("dotenv").config();
} catch (err) {
  console.log("Note: .env file not found, using default values");
}

require("./models/db");
require("./models/user");
require("./models/task");
const userroutes = require("./routes/authroutes");

app.use(express.json());

// Basic route for health check
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API is running",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", userroutes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
