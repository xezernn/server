const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neptun Express Backend API',
      version: '1.0.1',
      description: 'Qısaca API-nin təsviri',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Obyektiv format (bu JWT üçün nümunədir)
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
