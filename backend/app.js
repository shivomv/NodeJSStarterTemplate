// Import required modules
const express = require("express"); // Import the Express.js framework
const cookieParser = require("cookie-parser"); // Import the cookie-parser middleware
const path = require("path"); // Add path module

// Create an instance of the Express app
const app = express();

// Import error handling middleware
const errorMiddleware = require("./middlewares/error");

// Middleware to parse JSON requests
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Enable cookie parsing for incoming requests

// Import route modules
const user = require("./routes/userRoute"); // Import user route module

// API routes
const baseUrl = "/api/v1";
app.use(baseUrl, user);

// Serve frontend static files in development mode for testing
// Comment out the production-only check to test frontend serving
// if (process.env.NODE_ENV === "production") {
  // Set static folder - update path to point to Vite's output directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve index.html for any route not matching API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
// }

// Middleware for handling errors
app.use(errorMiddleware); // Use error handling middleware to catch and handle errors

// Export the Express app
module.exports = app;
