const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const app = express();

const authenticateRoute = require('./authenticate/authenticate');
const roomRouter = require('./routes/room');
const eventRouter = require('./routes/events');
const messageRouter = require('./routes/message');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,x-access-token');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});
app.use('/api/auth', authenticateRoute);
app.use('/api/room', roomRouter);
app.use('/api/eventlog', eventRouter);
app.use('/api/message', messageRouter);
module.exports = app;
