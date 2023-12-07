const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
// const router = express.Router();
// router.use('/', require('./swagger'));
app.use(express.json());
require('dotenv').config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const coll = process.env.DB_COLLECTION;
const routes = require('./routes/contact-routes.js');

app.use('/', routes);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Require the connect function from your db.js module and store it in a constant called connect
const { connect } = require('./db/db.js');

// Use an immediately-invoked function expression (IIFE) to connect to the database, then start the server
(async () => {
    try {
      // Call the connect function and store the returned connection object in app.locals.db
      const db = await connect(uri, dbName);
        app.locals.db = db;
        app.locals.uri = uri;
        app.use('/', routes);
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
      });
    } catch (err) {
      console.error('Error starting server:', err);
    }
  })();

