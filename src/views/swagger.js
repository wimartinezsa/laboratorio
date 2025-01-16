// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'CLINISOFT',
      version: '1.0.0',
      description: 'Documentación de endpoint de API'
    },
  },

  apis: ["./src/documents/*.js"], 
};


const specs = swaggerJsdoc(options);

const swaggerSetup = swaggerUi.setup(specs);

export { swaggerUi, swaggerSetup };
