/**
 * Swagger definitions for admin-related endpoints
 */

const paths = {
  '/users/admin/users': {
    get: {
      summary: 'Get all users',
      tags: ['Admin'],
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: 'Users retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  users: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            }
          }
        },
        401: { description: 'Not authenticated' },
        403: { description: 'Not authorized' },
        500: { description: 'Server error' }
      }
    }
  },
  '/users/admin/user/{id}': {
    get: {
      summary: 'Get user by ID',
      tags: ['Admin'],
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'User ID'
        }
      ],
      responses: {
        200: {
          description: 'User retrieved successfully',
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
              }
            }
          }
        },
        401: { description: 'Not authenticated' },
        403: { description: 'Not authorized' },
        404: { description: 'User not found' },
        500: { description: 'Server error' }
      }
    },
    put: {
      summary: 'Update user role',
      tags: ['Admin'],
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'User ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['role'],
              properties: {
                role: {
                  type: 'string',
                  enum: ['user', 'admin'],
                  description: 'User role'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User role updated successfully',
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
              }
            }
          }
        },
        401: { description: 'Not authenticated' },
        403: { description: 'Not authorized' },
        404: { description: 'User not found' },
        500: { description: 'Server error' }
      }
    }
  }
};

module.exports = {
  paths
};
