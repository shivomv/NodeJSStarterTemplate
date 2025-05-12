// Import required modules
const app = require("./app"); // Import the Express app instance
const dotenv = require("dotenv"); // Import the dotenv module for environment variable management
const connectDatabase = require("./config/database"); // Import the database connection module
const logger = require("./utils/logger"); // Import the logger
const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  logger.info("Logs directory created");
}

// Load Environment Variables
/**
 * Load environment variables from the config.env file using dotenv.
 */
dotenv.config({ path: "backend/config/config.env" });
logger.info("Environment variables loaded");

// Connect to Database
/**
 * Establish a connection to the database using the connectDatabase module.
 * In development mode, we'll continue even if the database connection fails
 */
// Connect to the database
connectDatabase().then(() => {
  logger.info("Database connected successfully");
}).catch((error) => {
  logger.error(`Database connection error: ${error.message}`);
  // Continue even if database connection fails in development
  if (process.env.NODE_ENV === 'production') {
    process.exit(1); // Exit in production if DB connection fails
  } else {
    logger.warn("Continuing without database connection in development mode");
  }
});

// Set Port Number
/**
 * Set the port number for the server to listen on.
 * Use the PORT environment variable or default to 5000.
 */
const port = process.env.PORT || 5000;

// Start Server
/**
 * Start the server and listen on the specified port.
 */
let server;
server = app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle Uncaught Exceptions
/**
 * Catch and handle uncaught exceptions to prevent server crashes.
 * Log the error message and shut down the server.
 */
process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    logger.error(err.stack);
    logger.error("Shutting down the server due to Uncaught Exception");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Handle Unhandled Promise Rejections
/**
 * Catch and handle unhandled promise rejections to prevent server crashes.
 * Log the error message and shut down the server.
 */
process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Promise Rejection: ${err.message}`);
    logger.error(err.stack);
    logger.error("Shutting down the server due to Unhandled Promise Rejection");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Handle SIGTERM signal (for graceful shutdown)
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        logger.info('Process terminated');
    });
});