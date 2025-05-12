/**
 * Validation schemas for user-related routes
 */

// User registration validation schema
const registerSchema = {
  body: {
    name: {
      required: true,
      type: 'string',
      minLength: 4,
      maxLength: 30
    },
    email: {
      required: true,
      type: 'string',
      isEmail: true
    },
    password: {
      required: true,
      type: 'string',
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      custom: (value) => {
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/\d/.test(value)) {
          return 'Password must contain at least one number';
        }
        if (!/[@$!%*?&]/.test(value)) {
          return 'Password must contain at least one special character (@$!%*?&)';
        }
        return null;
      }
    },
    role: {
      type: 'string',
      enum: ['user', 'admin']
    }
  }
};

// User login validation schema
const loginSchema = {
  body: {
    email: {
      required: true,
      type: 'string',
      isEmail: true
    },
    password: {
      required: true,
      type: 'string'
    }
  }
};

// Forgot password validation schema
const forgotPasswordSchema = {
  body: {
    email: {
      required: true,
      type: 'string',
      isEmail: true
    }
  }
};

// Reset password validation schema
const resetPasswordSchema = {
  params: {
    token: {
      required: true,
      type: 'string'
    }
  },
  body: {
    password: {
      required: true,
      type: 'string',
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    confirmPassword: {
      required: true,
      type: 'string',
      custom: (value, context) => {
        // Simple equality check without relying on req object
        if (context && context.body && value !== context.body.password) {
          return 'Passwords do not match';
        }
        return null;
      }
    }
  }
};

// Change password validation schema
const changePasswordSchema = {
  body: {
    oldPassword: {
      required: true,
      type: 'string'
    },
    newPassword: {
      required: true,
      type: 'string',
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
  }
};

// Update user role validation schema
const updateUserRoleSchema = {
  params: {
    id: {
      required: true,
      type: 'string'
    }
  },
  body: {
    name: {
      type: 'string',
      minLength: 4,
      maxLength: 30
    },
    email: {
      type: 'string',
      isEmail: true
    },
    role: {
      required: true,
      type: 'string',
      enum: ['user', 'admin']
    }
  }
};

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateUserRoleSchema
};
