/* eslint-disable no-unused-vars */
const express = require('express');
const database = require('./database');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3000);
console.log('listening on port 3000');
