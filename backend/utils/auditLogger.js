/**
 * Audit Logger
 *
 * Specialized logger for tracking user actions and data changes.
 * Captures precise, valuable data while avoiding unnecessary details.
 * Designed for scalability and efficient analysis.
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define a readable format for audit logs
const auditFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...details }) => {
    // Format the audit details in a readable way
    let detailsStr = '';

    // Filter out sensitive data
    const safeDetails = { ...details };
    ['password', 'token', 'resetPasswordToken'].forEach(field => {
      if (safeDetails[field]) delete safeDetails[field];
    });

    // Format user information
    let userInfo = '';
    if (safeDetails.user) {
      userInfo = `User: ${safeDetails.user.email || safeDetails.user.id || 'Unknown'}`;
      delete safeDetails.user;
    } else if (safeDetails.actor) {
      userInfo = `User: ${safeDetails.actor.email || safeDetails.actor.id || 'Unknown'}`;
      delete safeDetails.actor;
    }

    // Format action details
    let actionInfo = '';
    if (safeDetails.action && safeDetails.entity) {
      actionInfo = `Action: ${safeDetails.action} ${safeDetails.entity}`;
      delete safeDetails.action;
      delete safeDetails.entity;
    }

    // Add remaining details if any
    if (Object.keys(safeDetails).length > 0) {
      detailsStr = ` - ${JSON.stringify(safeDetails)}`;
    }

    return `${timestamp} [${level.toUpperCase()}] ${message} - ${userInfo} - ${actionInfo}${detailsStr}`;
  })
);

// Create audit logger with a single file
const auditLogger = winston.createLogger({
  level: 'info',
  format: auditFormat,
  transports: [
    // Single audit log file with size-based rotation
    new winston.transports.File({
      filename: path.join(logsDir, 'audit.log'),
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 3
    })
  ],
  exitOnError: false
});

/**
 * Sanitize object to remove sensitive data
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = { ...obj };

  // Remove sensitive fields
  const sensitiveFields = [
    'password',
    'passwordConfirm',
    'resetPasswordToken',
    'resetPasswordExpire',
    'token'
  ];

  sensitiveFields.forEach(field => {
    if (field in sanitized) delete sanitized[field];
  });

  return sanitized;
}

/**
 * Log a data change with structured details
 * @param {Object} options - Logging options
 * @param {string} options.action - Action performed (create, update, delete)
 * @param {string} options.entity - Entity type (user, product, etc.)
 * @param {string} options.entityId - ID of the affected entity
 * @param {Object} options.before - State before change (for updates/deletes)
 * @param {Object} options.after - State after change (for creates/updates)
 * @param {Object} options.user - User who performed the action
 * @param {Object} options.request - Request details
 */
function logAction(options) {
  const {
    action,
    entity,
    entityId,
    before,
    after,
    user = {},
    request = {}
  } = options;

  // Extract only changed fields for updates
  let changes = {};
  if (action === 'update' && before && after) {
    Object.keys(after).forEach(key => {
      // Skip sensitive fields and unchanged values
      if (before[key] !== after[key] &&
          !['password', 'passwordConfirm', 'resetPasswordToken', 'resetPasswordExpire'].includes(key)) {
        changes[key] = {
          from: before[key],
          to: after[key]
        };
      }
    });
  }

  // Build a clean log entry with only relevant data
  const logEntry = {
    // Include relevant data based on action type
    ...(action === 'create' && {
      data: sanitizeObject(after)
    }),
    ...(action === 'update' && {
      changes: Object.keys(changes).length > 0 ? changes : undefined
    }),
    ...(action === 'delete' && {
      data: sanitizeObject(before)
    }),

    // Include user information if available
    ...(user.id && {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }),

    // Include minimal request information
    ...(Object.keys(request).length > 0 && {
      request: {
        ip: request.ip,
        method: request.method,
        path: request.path
      }
    })
  };

  // Log with appropriate message based on action
  auditLogger.info(`${entity} ${action}`, {
    action,
    entity,
    entityId,
    ...logEntry
  });
}

/**
 * Log an authentication event
 * @param {Object} options - Logging options
 * @param {string} options.userId - User ID (if available)
 * @param {string} options.userEmail - User email
 * @param {string} options.action - Auth action (login, logout, etc.)
 * @param {boolean} options.success - Whether auth was successful
 * @param {string} options.ipAddress - IP address
 * @param {string} options.userAgent - User agent
 * @param {string} options.reason - Failure reason (if applicable)
 */
function logAuth(options) {
  const {
    userId,
    userEmail,
    action,
    success = true,
    ipAddress,
    userAgent,
    reason
  } = options;

  // Build a clean auth log entry
  auditLogger.info(`Auth ${action}`, {
    action,
    // Set entity to 'auth' for all authentication events
    entity: 'auth',
    success,

    // Include user information if available
    ...(userId || userEmail ? {
      user: {
        id: userId,
        email: userEmail
      }
    } : {}),

    // Include request information
    request: {
      ip: ipAddress,
      userAgent
    },

    // Include failure reason if applicable
    ...(reason && { reason })
  });
}

/**
 * Log a create action
 * @param {Object} options - Logging options
 */
function logCreate(options) {
  const {
    userId,
    userEmail,
    action,
    entity,
    entityId,
    newValues,
    ipAddress,
    userAgent
  } = options;

  auditLogger.info(`${entity} created`, {
    action,
    entity,
    entityId,
    user: {
      id: userId,
      email: userEmail
    },
    data: sanitizeObject(newValues),
    request: {
      ip: ipAddress,
      userAgent
    }
  });
}

/**
 * Log an update action
 * @param {Object} options - Logging options
 */
function logUpdate(options) {
  const {
    userId,
    userEmail,
    action,
    entity,
    entityId,
    oldValues,
    newValues,
    ipAddress,
    userAgent
  } = options;

  // Extract only changed fields
  let changes = {};
  if (oldValues && newValues) {
    Object.keys(newValues).forEach(key => {
      // Skip sensitive fields and unchanged values
      if (oldValues[key] !== newValues[key] &&
          !['password', 'passwordConfirm', 'resetPasswordToken', 'resetPasswordExpire'].includes(key)) {
        changes[key] = {
          from: oldValues[key],
          to: newValues[key]
        };
      }
    });
  }

  auditLogger.info(`${entity} updated`, {
    action,
    entity,
    entityId,
    user: {
      id: userId,
      email: userEmail
    },
    changes: Object.keys(changes).length > 0 ? changes : undefined,
    request: {
      ip: ipAddress,
      userAgent
    }
  });
}

/**
 * Log a delete action
 * @param {Object} options - Logging options
 */
function logDelete(options) {
  const {
    userId,
    userEmail,
    action,
    entity,
    entityId,
    oldValues,
    ipAddress,
    userAgent
  } = options;

  auditLogger.info(`${entity} deleted`, {
    action,
    entity,
    entityId,
    user: {
      id: userId,
      email: userEmail
    },
    data: sanitizeObject(oldValues),
    request: {
      ip: ipAddress,
      userAgent
    }
  });
}

module.exports = {
  logAction,
  logAuth,
  logCreate,
  logUpdate,
  logDelete
};
