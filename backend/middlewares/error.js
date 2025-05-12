const ErrorHandler = require("../utils/ErrorHandler");
const logger = require("../utils/logger");

/**
 * Global error handling middleware
 * Processes all errors and sends appropriate response to client
 */
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Log the error
    if (err.statusCode >= 500) {
        logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        logger.error(err.stack);
    } else {
        logger.warn(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }

    // MongoDB CastError (Invalid ID)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        const message = `Duplicate field value: ${field} = ${value}. Please use another value.`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Errors
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid token. Please log in again.`;
        err = new ErrorHandler(message, 401);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Token expired. Please log in again.`;
        err = new ErrorHandler(message, 401);
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        err = new ErrorHandler(message, 400);
    }

    // Send response to client
    res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        // Include stack trace in development mode
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};
