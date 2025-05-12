/**
 * Main Swagger configuration file
 * This file combines all the Swagger definitions from different modules
 */

const swaggerJsdoc = require('swagger-jsdoc');

// Import Swagger definitions from modules
const userDefinitions = require('./definitions/userDefinitions');
const adminDefinitions = require('./definitions/adminDefinitions');
const logDefinitions = require('./definitions/logDefinitions');

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication API',
      version: '1.0.0',
      description: `
## Authentication API Documentation

This API provides user authentication and management functionality.

### Important Authentication Instructions
To use protected endpoints (marked with 🔒):

1. **First, login to the application** by using the login form in the main application
2. Alternatively, you can use the \`POST /users/login\` endpoint directly in your browser (not in Swagger UI)
3. After logging in, return to Swagger UI - you'll now be able to use protected endpoints
4. The authentication is handled via cookies, so you must be logged in to use protected endpoints

**Note:** The "Authorize" button in Swagger UI won't work for authentication as it doesn't handle cookies properly.
      `,
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: `
## Cookie-based Authentication

This API uses cookies for authentication. Follow these steps:

1. **Login to the application first** using the main application login form
2. Alternatively, use the \`POST /users/login\` endpoint directly in your browser (not in Swagger UI)
3. After logging in, return to Swagger UI - you'll now be authenticated for protected endpoints
4. Protected endpoints (marked with 🔒) require authentication

**Important Notes:**
- The "Authorize" button in Swagger UI won't work for authentication
- You must be logged in to the application to use protected endpoints
- Swagger UI itself doesn't handle the authentication, it relies on your browser's cookies
          `,
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  statusCode: {
                    type: 'integer',
                    example: 401
                  },
                  message: {
                    type: 'string',
                    example: 'Please login to access this resource'
                  }
                }
              }
            }
          }
        },
        ForbiddenError: {
          description: 'User does not have permission to access this resource',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  statusCode: {
                    type: 'integer',
                    example: 403
                  },
                  message: {
                    type: 'string',
                    example: 'Access denied. Your role does not have permission to access this resource.'
                  }
                }
              }
            }
          }
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
            },
            avatar: {
              type: 'object',
              properties: {
                public_id: {
                  type: 'string',
                  description: 'Avatar public ID',
                },
                url: {
                  type: 'string',
                  description: 'Avatar URL',
                },
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation date',
            },
          },
        },
      },
      tags: [
        {
          name: 'Authentication',
          description: 'User authentication endpoints',
        },
        {
          name: 'User',
          description: 'User profile endpoints',
        },
        {
          name: 'Admin',
          description: 'Admin endpoints',
        },
        {
          name: 'Logs',
          description: 'System and audit logs endpoints',
        },
      ],
    },
    paths: {
      // Combine paths from all modules
      ...userDefinitions.paths,
      ...adminDefinitions.paths,
      ...logDefinitions.paths,
    }
  },
  // Path to the API docs - not needed when we define paths directly
  apis: [],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
