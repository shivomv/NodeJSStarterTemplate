const express = require("express");

const app = express();

const errorMiddleware = require("./middlewares/error");

// Middleware to parse JSON
app.use(express.json());

// Route imports
const product = require("./routes/productRoute");

// Use product routes
app.use("/api/v1", product);

// Middleware for handling errors
app.use(errorMiddleware);

module.exports = app;
