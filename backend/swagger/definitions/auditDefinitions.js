/**
 * Swagger definitions for audit-related endpoints
 */

const paths = {
  '/audit': {
    get: {
      summary: 'Get audit logs with pagination and filtering',
      tags: ['Audit'],
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1
          },
          description: 'Page number'
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 50
          },
          description: 'Number of entries per page'
        },
        {
          in: 'query',
          name: 'userId',
          schema: {
            type: 'string'
          },
          description: 'Filter by user ID'
        },
        {
          in: 'query',
          name: 'action',
          schema: {
            type: 'string',
            enum: ['create', 'update', 'delete', 'login', 'logout']
          },
          description: 'Filter by action type'
        },
        {
          in: 'query',
          name: 'entity',
          schema: {
            type: 'string',
            enum: ['user', 'auth', 'product', 'order']
          },
          description: 'Filter by entity type'
        },
        {
          in: 'query',
          name: 'startDate',
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Filter by start date (YYYY-MM-DD)'
        },
        {
          in: 'query',
          name: 'endDate',
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Filter by end date (YYYY-MM-DD)'
        }
      ],
      responses: {
        200: {
          description: 'Audit logs retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  totalEntries: {
                    type: 'integer',
                    example: 120
                  },
                  page: {
                    type: 'integer',
                    example: 1
                  },
                  totalPages: {
                    type: 'integer',
                    example: 3
                  },
                  limit: {
                    type: 'integer',
                    example: 50
                  },
                  entries: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        timestamp: {
                          type: 'string',
                          example: '2025-05-11T00:44:15.000Z'
                        },
                        level: {
                          type: 'string',
                          example: 'info'
                        },
                        message: {
                          type: 'string',
                          example: 'Entity updated'
                        },
                        userId: {
                          type: 'string',
                          example: '60d0fe4f5311236168a109ca'
                        },
                        userEmail: {
                          type: 'string',
                          example: 'admin@example.com'
                        },
                        action: {
                          type: 'string',
                          example: 'update'
                        },
                        entity: {
                          type: 'string',
                          example: 'user'
                        },
                        entityId: {
                          type: 'string',
                          example: '60d0fe4f5311236168a109cb'
                        },
                        oldValues: {
                          type: 'object',
                          example: {
                            role: 'user'
                          }
                        },
                        newValues: {
                          type: 'object',
                          example: {
                            role: 'admin'
                          }
                        },
                        changes: {
                          type: 'object',
                          example: {
                            role: {
                              from: 'user',
                              to: 'admin'
                            }
                          }
                        },
                        ipAddress: {
                          type: 'string',
                          example: '::1'
                        },
                        userAgent: {
                          type: 'string',
                          example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
                        }
                      }
                    }
                  },
                  filters: {
                    type: 'object',
                    properties: {
                      users: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['60d0fe4f5311236168a109ca', '60d0fe4f5311236168a109cb']
                      },
                      actions: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['create', 'update', 'delete', 'login', 'logout']
                      },
                      entities: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['user', 'auth', 'product', 'order']
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: { description: 'Not authenticated' },
        403: { description: 'Not authorized' },
        404: { description: 'Audit log file not found' },
        500: { description: 'Server error' }
      }
    }
  }
};

module.exports = {
  paths
};
