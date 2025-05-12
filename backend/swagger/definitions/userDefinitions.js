/**
 * Swagger definitions for user-related endpoints
 */

const paths = {
  // Authentication endpoints
  '/users/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'password'],
              properties: {
                name: {
                  type: 'string',
                  description: "User's name"
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: "User's email"
                },
                password: {
                  type: 'string',
                  format: 'password',
                  description: "User's password"
                }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'User registered successfully' },
        400: { description: 'Validation error' },
        500: { description: 'Server error' }
      }
    }
  },
  '/users/login': {
    post: {
      summary: 'Login a user (IMPORTANT: Use in browser, not in Swagger UI)',
      description: `
**IMPORTANT: To use protected endpoints, you need to be logged in**

1. Use the login form in the main application to log in
2. Alternatively, you can use this endpoint directly in your browser (not in Swagger UI)
3. After logging in, return to Swagger UI - you'll now be able to use protected endpoints

The server sets a cookie in your browser that will be used for authentication.

**Note:** If you try to execute this endpoint in Swagger UI, it won't set the cookie properly for authentication.
      `,
      tags: ['Authentication'],
      externalDocs: {
        description: 'Learn more about authentication',
        url: '#/components/securitySchemes/cookieAuth'
      },
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: "User's email"
                },
                password: {
                  type: 'string',
                  format: 'password',
                  description: "User's password"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login successful. Sets authentication cookie.',
          headers: {
            'Set-Cookie': {
              schema: {
                type: 'string',
                example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/; HttpOnly'
              },
              description: 'Authentication token stored in cookie'
            }
          },
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  user: {
                    $ref: '#/components/schemas/User'
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Invalid credentials',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid email or password'
                  }
                }
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Internal server error'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/users/password/forgot': {
    post: {
      summary: 'Request password reset',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: "User's email"
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Password reset email sent' },
        404: { description: 'User not found' },
        500: { description: 'Server error' }
      }
    }
  },
  '/users/password/reset/{token}': {
    put: {
      summary: 'Reset password with token',
      tags: ['Authentication'],
      parameters: [
        {
          in: 'path',
          name: 'token',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Password reset token'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['password', 'confirmPassword'],
              properties: {
                password: {
                  type: 'string',
                  format: 'password',
                  description: 'New password'
                },
                confirmPassword: {
                  type: 'string',
                  format: 'password',
                  description: 'Confirm new password'
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Password reset successful' },
        400: { description: 'Invalid token or passwords don\'t match' },
        500: { description: 'Server error' }
      }
    }
  },
  '/users/logout': {
    get: {
      summary: 'Logout a user',
      tags: ['Authentication'],
      responses: {
        200: { description: 'Logout successful' },
        500: { description: 'Server error' }
      }
    }
  },

  // User profile endpoints
  '/users/me': {
    get: {
      summary: 'Get current user profile',
      description: 'Returns the profile information of the currently authenticated user',
      tags: ['User'],
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: 'User profile retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  user: {
                    $ref: '#/components/schemas/User'
                  }
                }
              },
              example: {
                "success": true,
                "user": {
                  "avatar": {
                    "public_id": "default_id",
                    "url": "default_url"
                  },
                  "_id": "681f9e096dd673b50215de8d",
                  "name": "Shivom",
                  "email": "shivom.verma.dev@gmail.com",
                  "role": "admin"
                }
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Error fetching user profile'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/users/password/change': {
    put: {
      summary: 'Change password',
      tags: ['User'],
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['oldPassword', 'newPassword', 'confirmPassword'],
              properties: {
                oldPassword: {
                  type: 'string',
                  format: 'password',
                  description: 'Current password'
                },
                newPassword: {
                  type: 'string',
                  format: 'password',
                  description: 'New password'
                },
                confirmPassword: {
                  type: 'string',
                  format: 'password',
                  description: 'Confirm new password'
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Password changed successfully' },
        400: { description: 'Validation error or passwords don\'t match' },
        401: { description: 'Not authenticated or incorrect old password' },
        500: { description: 'Server error' }
      }
    }
  }
};

module.exports = {
  paths
};
