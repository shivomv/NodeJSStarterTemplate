const mongoose = require("mongoose");
const logger = require("../utils/logger");

/**
 * Connect to MongoDB database
 * @returns {Promise} Mongoose connection promise
 */
const connectDatabase = async () => {
  try {
    // Set mongoose options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.DB_URI, options);

    // Log successful connection
    logger.info(`MongoDB connected: ${connection.connection.host}`);

    // Add connection event listeners
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return connection;
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    throw error; // Rethrow to be handled by the caller
  }
};

module.exports = connectDatabase;