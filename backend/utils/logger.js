const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log levels with custom priorities
const customLevels = {
  levels: {
    error: 0,    // Critical errors
    warn: 1,     // Warnings
    info: 2,     // General information
    event: 3,    // Important system events
    audit: 4     // User actions (for auditing)
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    event: 'blue',
    audit: 'cyan'
  }
};

// Add colors to Winston
winston.addColors(customLevels.colors);

// Format for readable logs - focused on important information
const focusedFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    // Filter out sensitive data
    const safeMeta = { ...meta };
    ['password', 'token', 'resetPasswordToken', 'resetPasswordExpire'].forEach(field => {
      if (field in safeMeta) delete safeMeta[field];
    });

    // Format user information if present
    let userInfo = '';
    if (safeMeta.user) {
      userInfo = ` [User: ${safeMeta.user.email || safeMeta.user.id || 'Unknown'}]`;
      delete safeMeta.user;
    }

    // Format remaining metadata if present
    let metaStr = '';
    if (Object.keys(safeMeta).length > 0 && safeMeta.service !== 'user-auth-api') {
      metaStr = ' - ' + JSON.stringify(safeMeta);
    }

    return `${timestamp} [${level.toUpperCase()}]${userInfo} ${message}${metaStr}`;
  })
);

// Configure consolidated log file for all important events
const eventsLogTransport = new winston.transports.File({
  filename: path.join(logsDir, 'events.log'),
  maxsize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  format: focusedFormat
});

// Separate error log for easier troubleshooting
const errorLogTransport = new winston.transports.File({
  filename: path.join(logsDir, 'errors.log'),
  level: 'error',
  maxsize: 5 * 1024 * 1024, // 5MB
  maxFiles: 3,
  format: focusedFormat
});

// Create logger instance with custom levels
const logger = winston.createLogger({
  levels: customLevels.levels,
  level: 'audit', // Capture all levels in development and production
  defaultMeta: { service: 'user-auth-api' },
  transports: [
    // Console transport for development with colorized output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          // Format user information if present
          let userInfo = '';
          if (meta.user) {
            userInfo = ` [User: ${meta.user.email || meta.user.id || 'Unknown'}]`;
          }
          return `${timestamp} [${level}]${userInfo} ${message}`;
        })
      )
    }),
    // File transports - consolidated events log and separate error log
    eventsLogTransport,
    errorLogTransport
  ],
  // Exception handling
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
      format: focusedFormat
    })
  ],
  exitOnError: false
});

// Create a stream object for Morgan HTTP request logging
logger.stream = {
  write: (message) => {
    // Only log HTTP requests at info level
    logger.info(message.trim());
  },
};

module.exports = logger;
