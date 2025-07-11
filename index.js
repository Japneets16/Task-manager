const express = require("express");
const cors = require("cors");
const app = express();

// Load environment variables
require("dotenv").config();

// Temporarily comment out database models for development
// require("./models/db");
// require("./models/user");
// require("./models/task");

// Use temporary in-memory routes for development
const userroutes = require("./routes/temp-authroutes");

// Enable CORS for frontend communication
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Basic route for health check
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API is running",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint for frontend connection
app.post("/api/test", (req, res) => {
  res.json({
    message: "Frontend and Backend are connected!",
    receivedData: req.body,
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", userroutes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
