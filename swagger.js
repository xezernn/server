const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neptun Express Backend API',
      version: '1.1.0',
      description: 'Qısaca API-nin təsviri',
    },
    servers: [
      {
        url: 'https://neptunbk.vercel.app',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};


const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
