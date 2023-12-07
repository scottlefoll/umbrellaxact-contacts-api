const swaggerAutogen = require('swagger-autogen')();

const router = require('express').Router();
const swaggerDocument = require('swagger-ui-express');
router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = router;

const doc = {
  info: {
    version: '1.0',      // by default: '1.0.0'
    title: 'UmbrellaXact Contact API',        // by default: 'REST API'
    description: 'UmbrellaXact Contact API',  // by default: ''
  },
  host: 'umbrellaxact-contacts.onrender.com/',
//   host: 'localhost:3000',
  basePath: '',
  schemes: [https],
//   schemes: ['http'],
  consumes: [],  // by default: ['application/json']
  produces: [application/json],  // by default: ['application/json']
          // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

// generate(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, endpointsFiles, doc);

