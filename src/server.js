const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require("./service/user/userRoutes");
const roomRoutes = require('./service/room/roomRoutes');
const messageRoutes = require("./service/message/messageRoutes");
const MONGO_URI = 'mongodb://localhost:27017'
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  next();
});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mongoose.connect(MONGO_URI);

app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/message', messageRoutes);

module.exports = exports = http.createServer(app);
