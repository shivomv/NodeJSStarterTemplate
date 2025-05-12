/**
 * Optimized Audit Middleware
 *
 * This middleware captures essential request details for audit logging.
 * It attaches only the necessary audit context to the request object.
 * Designed for performance and to avoid capturing sensitive information.
 */

/**
 * Get client IP address from request
 * @param {Object} req - Express request object
 * @returns {string} Client IP address
 */
const getClientIp = (req) => {
  // Check for forwarded IP (when behind a proxy/load balancer)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // Get the first IP if there are multiple
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.connection.remoteAddress;
};

/**
 * Middleware to capture essential request details for audit logging
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const auditMiddleware = (req, res, next) => {
  // Capture only essential request details
  req.auditContext = {
    // Request information
    ipAddress: getClientIp(req),
    userAgent: req.headers['user-agent'],
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),

    // Resource identifiers from URL parameters
    resourceId: req.params.id || req.params.token || null,

    // Request origin
    origin: req.headers.origin || req.headers.referer || null,
  };

  // If user is authenticated, add user info to audit context
  if (req.user) {
    req.auditContext.userId = req.user.id;
    req.auditContext.userEmail = req.user.email;
    req.auditContext.userRole = req.user.role;
  }

  next();
};

module.exports = auditMiddleware;
