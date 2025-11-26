const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blackie Networks API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for Blackie Networks backend services',
      contact: {
        name: 'Blackie Networks Support',
        email: 'support@blackienetworks.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: process.env.API_URL || `http://localhost:${process.env.PORT || 3002}`,
        description: 'Development server'
      },
      {
        url: 'https://api.blackienetworks.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your access token (without Bearer prefix)'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'ERROR_CODE'
            },
            message: {
              type: 'string',
              example: 'Error message description'
            },
            details: {
              type: 'object',
              description: 'Additional error details'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        AccessToken: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Token ID'
            },
            name: {
              type: 'string',
              example: 'My Service Token'
            },
            description: {
              type: 'string',
              example: 'Token for my service'
            },
            allowedChannels: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['email', 'sms', 'push', 'whatsapp']
              },
              example: ['email', 'sms']
            },
            rateLimit: {
              type: 'number',
              example: 1000
            },
            isActive: {
              type: 'boolean',
              example: true
            },
            usageCount: {
              type: 'number',
              example: 42
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Notification ID'
            },
            channel: {
              type: 'string',
              enum: ['email', 'sms', 'push', 'whatsapp'],
              example: 'email'
            },
            recipient: {
              type: 'string',
              example: 'user@example.com'
            },
            recipientName: {
              type: 'string',
              example: 'John Doe'
            },
            subject: {
              type: 'string',
              example: 'Welcome!'
            },
            message: {
              type: 'string',
              example: 'Your notification message'
            },
            status: {
              type: 'string',
              enum: ['pending', 'sent', 'delivered', 'failed', 'bounced'],
              example: 'sent'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Booking: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            phone: {
              type: 'string',
              example: '+1234567890'
            },
            service: {
              type: 'string',
              example: 'Web Development'
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2024-12-25'
            },
            time: {
              type: 'string',
              example: '10:00'
            },
            description: {
              type: 'string',
              example: 'Need a new website'
            }
          }
        },
        OTP: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'OTP sent successfully via email'
            },
            data: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email'
                },
                phoneNumber: {
                  type: 'string',
                  example: '+254796869402'
                },
                expiresInMinutes: {
                  type: 'number',
                  example: 10
                },
                notificationId: {
                  type: 'string'
                },
                messageId: {
                  type: 'string'
                },
                otp: {
                  type: 'string',
                  description: 'Only returned in development/testing environment',
                  example: '123456'
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints'
      },
      {
        name: 'Tokens',
        description: 'Access token management'
      },
      {
        name: 'Notifications',
        description: 'Send and manage notifications via email, SMS, etc.'
      },
      {
        name: 'Bookings',
        description: 'Booking management'
      },
      {
        name: 'Templates',
        description: 'Notification template management'
      },
      {
        name: 'OTP',
        description: 'OTP (One-Time Password) service for email and SMS'
      },
      {
        name: 'Users',
        description: 'User management endpoints (authentication required for some endpoints)'
      }
    ]
  },
  apis: [
    './routes/*.js',
    './app.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  // Swagger UI options - configured to avoid SSL/CDN issues
  const swaggerUiOptions = {
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info { margin: 20px 0; }
      .swagger-ui .info .title { color: #00f0ff; }
      .swagger-ui .scheme-container { background: #0a0e27; padding: 10px; }
    `,
    customSiteTitle: 'Blackie Networks API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true, // Keep auth token after page refresh
      displayRequestDuration: true,
      filter: true, // Enable search/filter
      tryItOutEnabled: true,
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      docExpansion: 'list', // 'none', 'list', or 'full'
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1,
      // Ensure we're using the correct server URL
      url: '/api-docs.json'
    },
    explorer: true
  };

  // Serve Swagger UI assets first (before the main UI)
  // swagger-ui-express serves all assets locally from node_modules
  app.use('/api-docs', swaggerUi.serve);
  app.use('/api-docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

  // Swagger JSON endpoint
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = { swaggerSetup, swaggerSpec };

