// Import required modules
const express = require("express"); // Import the Express.js framework
const cookieParser = require("cookie-parser"); // Import the cookie-parser middleware

// Create an instance of the Express app
const app = express();

// Import error handling middleware
const errorMiddleware = require("./middlewares/error");

// Middleware to parse JSON requests
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Enable cookie parsing for incoming requests

// Import route modules
const product = require("./routes/productRoute"); // Import product route module
const user = require("./routes/userRoute"); // Import user route module
const order = require("./routes/orderRoute"); // Import order route module
const cart = require("./routes/cartRoute"); // Import cart route module

// Use routes
const baseUrl = "/api/v1";
app.use(baseUrl, product); // Mount product routes at /api/v1
app.use(baseUrl, user); // Mount user routes at /api/v1
app.use(baseUrl, order); // Mount order routes at /api/v1
app.use(baseUrl, cart); // Mount cart routes at /api/v1
    
// Middleware for handling errors
app.use(errorMiddleware); // Use error handling middleware to catch and handle errors

// Export the Express app
module.exports = app;