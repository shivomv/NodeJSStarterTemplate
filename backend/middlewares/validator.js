const ErrorHandler = require("../utils/ErrorHandler");

/**
 * Validation middleware for request data
 * Validates request body, params, or query based on provided schema
 */

/**
 * Validate request data against a schema
 * @param {Object} schema - Validation schema object with body, params, query properties
 * @returns {Function} Express middleware function
 */
const validate = (schema) => (req, res, next) => {
  const validationErrors = [];

  // Validate request body if schema.body exists
  if (schema.body) {
    const bodyValidation = validateObject(req.body, schema.body);
    if (bodyValidation.length > 0) {
      validationErrors.push(...bodyValidation);
    }
  }

  // Validate request params if schema.params exists
  if (schema.params) {
    const paramsValidation = validateObject(req.params, schema.params);
    if (paramsValidation.length > 0) {
      validationErrors.push(...paramsValidation);
    }
  }

  // Validate request query if schema.query exists
  if (schema.query) {
    const queryValidation = validateObject(req.query, schema.query);
    if (queryValidation.length > 0) {
      validationErrors.push(...queryValidation);
    }
  }

  // If validation errors exist, return error response
  if (validationErrors.length > 0) {
    return next(new ErrorHandler(`Validation error: ${validationErrors.join(', ')}`, 400));
  }

  // If validation passes, proceed to next middleware
  return next();
};

/**
 * Validate an object against a schema
 * @param {Object} object - Object to validate
 * @param {Object} schema - Schema to validate against
 * @returns {Array} Array of validation error messages
 */
const validateObject = (object, schema) => {
  const errors = [];

  // Check required fields
  for (const [field, rules] of Object.entries(schema)) {
    // Check if field is required and missing
    if (rules.required && (object[field] === undefined || object[field] === null || object[field] === '')) {
      errors.push(`${field} is required`);
      continue;
    }

    // Skip further validation if field is not present and not required
    if (object[field] === undefined || object[field] === null) {
      continue;
    }

    // Validate field type
    if (rules.type && typeof object[field] !== rules.type) {
      errors.push(`${field} must be a ${rules.type}`);
    }

    // Validate string length
    if (rules.type === 'string') {
      if (rules.minLength && object[field].length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }

      if (rules.maxLength && object[field].length > rules.maxLength) {
        errors.push(`${field} must be at most ${rules.maxLength} characters`);
      }

      // Validate email format
      if (rules.isEmail && !validateEmail(object[field])) {
        errors.push(`${field} must be a valid email address`);
      }
    }

    // Validate number range
    if (rules.type === 'number') {
      if (rules.min !== undefined && object[field] < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }

      if (rules.max !== undefined && object[field] > rules.max) {
        errors.push(`${field} must be at most ${rules.max}`);
      }
    }

    // Validate enum values
    if (rules.enum && !rules.enum.includes(object[field])) {
      errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
    }

    // Validate custom pattern
    if (rules.pattern && !rules.pattern.test(object[field])) {
      errors.push(`${field} format is invalid`);
    }

    // Run custom validator function
    if (rules.custom && typeof rules.custom === 'function') {
      // Pass the entire object as context to the custom validator
      const customError = rules.custom(object[field], object);
      if (customError) {
        errors.push(customError);
      }
    }
  }

  return errors;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = { validate };
