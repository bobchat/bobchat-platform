const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user-routes');
const PORT = process.env.PORT || 8080;
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

let server = {
  run: () => {
    return new Promise((resolve, reject) => {
      app.listen(PORT, () => {
        resolve(PORT);
      });
    })
  }
};


module.exports = exports = server;
