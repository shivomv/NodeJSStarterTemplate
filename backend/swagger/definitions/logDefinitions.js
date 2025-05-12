/**
 * Swagger definitions for log-related endpoints
 */

const paths = {
  '/logs': {
    get: {
      summary: 'Get consolidated logs from all log files with filtering and pagination',
      tags: ['Logs'],
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
          name: 'logType',
          schema: {
            type: 'string',
            enum: ['events', 'audit', 'error', 'combined']
          },
          description: 'Filter by log type/file'
        },
        {
          in: 'query',
          name: 'level',
          schema: {
            type: 'string',
            enum: ['error', 'warn', 'info', 'debug', 'event', 'audit']
          },
          description: 'Filter by log level'
        },
        {
          in: 'query',
          name: 'search',
          schema: {
            type: 'string'
          },
          description: 'Search term to filter log messages'
        },
        {
          in: 'query',
          name: 'startDate',
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Filter logs from this date (YYYY-MM-DD)'
        },
        {
          in: 'query',
          name: 'endDate',
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Filter logs until this date (YYYY-MM-DD)'
        },
        {
          in: 'query',
          name: 'user',
          schema: {
            type: 'string'
          },
          description: 'Filter logs by user email or ID'
        },
        {
          in: 'query',
          name: 'ip',
          schema: {
            type: 'string'
          },
          description: 'Filter logs by IP address'
        },
        {
          in: 'query',
          name: 'device',
          schema: {
            type: 'string',
            enum: ['Desktop', 'Mobile', 'Tablet']
          },
          description: 'Filter logs by device type'
        },
        {
          in: 'query',
          name: 'browser',
          schema: {
            type: 'string',
            enum: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Internet Explorer', 'Unknown']
          },
          description: 'Filter logs by browser'
        },
        {
          in: 'query',
          name: 'os',
          schema: {
            type: 'string',
            enum: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Unknown']
          },
          description: 'Filter logs by operating system'
        },
        {
          in: 'query',
          name: 'action',
          schema: {
            type: 'string',
            enum: ['create', 'update', 'delete', 'login', 'logout', 'forgot-password', 'reset-password']
          },
          description: 'Filter logs by action (for audit logs)'
        },
        {
          in: 'query',
          name: 'entity',
          schema: {
            type: 'string',
            enum: ['user', 'auth', 'product', 'order']
          },
          description: 'Filter logs by entity (for audit logs)'
        }
      ],
      responses: {
        200: {
          description: 'Consolidated logs retrieved successfully',
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
                    example: 150
                  },
                  filteredEntries: {
                    type: 'integer',
                    example: 75
                  },
                  page: {
                    type: 'integer',
                    example: 1
                  },
                  totalPages: {
                    type: 'integer',
                    example: 2
                  },
                  filters: {
                    type: 'object',
                    properties: {
                      logTypes: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['events', 'audit', 'error', 'combined']
                      },
                      levels: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['error', 'warn', 'info', 'debug', 'audit']
                      },
                      users: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['admin@example.com', 'user@example.com']
                      },
                      ipAddresses: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['::1', '127.0.0.1']
                      },
                      devices: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['Desktop', 'Mobile', 'Tablet']
                      },
                      browsers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['Chrome', 'Firefox', 'Safari']
                      },
                      operatingSystems: {
                        type: 'array',
                        items: {
                          type: 'string'
                        },
                        example: ['Windows', 'macOS', 'Linux']
                      }
                    }
                  },
                  entries: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        logType: {
                          type: 'string',
                          example: 'audit'
                        },
                        timestamp: {
                          type: 'string',
                          example: '2025-05-11 00:44:15'
                        },
                        level: {
                          type: 'string',
                          enum: ['error', 'warn', 'info', 'debug', 'event', 'audit'],
                          example: 'info'
                        },
                        message: {
                          type: 'string',
                          example: 'Auth login'
                        },
                        user: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: '60d0fe4f5311236168a109ca'
                            },
                            email: {
                              type: 'string',
                              example: 'admin@example.com'
                            },
                            role: {
                              type: 'string',
                              example: 'admin'
                            }
                          }
                        },
                        action: {
                          type: 'string',
                          example: 'login'
                        },
                        entity: {
                          type: 'string',
                          example: 'auth'
                        },
                        ipAddress: {
                          type: 'string',
                          example: '::1'
                        },
                        userAgent: {
                          type: 'string',
                          example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
                        },
                        device: {
                          type: 'object',
                          properties: {
                            browser: {
                              type: 'string',
                              example: 'Chrome'
                            },
                            os: {
                              type: 'string',
                              example: 'Windows'
                            },
                            device: {
                              type: 'string',
                              example: 'Desktop'
                            }
                          }
                        },
                        metadata: {
                          type: 'object',
                          example: {
                            success: true,
                            request: {
                              ip: '::1',
                              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
                            }
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
                        raw: {
                          type: 'string',
                          description: 'Original log line if parsing failed',
                          example: '2025-05-11 15:37:12 [INFO] Auth login - User: admin@example.com - Action: login auth - {"success":true,"request":{"ip":"::1","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"}}'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          $ref: '#/components/responses/UnauthorizedError'
        },
        403: {
          $ref: '#/components/responses/ForbiddenError'
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
                  statusCode: {
                    type: 'integer',
                    example: 500
                  },
                  message: {
                    type: 'string',
                    example: 'Error fetching consolidated logs'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = {
  paths
};
