const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'E-commerce API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Change this to your server URL
            },
        ],
    },
    apis: ['./../routes/*.js', './../models/*.js'], // Paths to files with Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
