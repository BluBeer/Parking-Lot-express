/* eslint-disable no-unused-vars */
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./database');
require('./passport-setup');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'parking-lot-session',
  keys: ['key1', 'key2'],
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000);
console.log('listening on port 3000');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Parking Lot API',
      description: 'Parking Lot API Information',
      contact: {
        name: 'BluBeer Developer',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', routes);
