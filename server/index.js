const express = require('express');
let app = express();
// const database = require('../database');
const controller = require('./controller');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: false}));

app.post('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('POST request received on server');
  controller.githubAPI.getData(req, res, next);
}, function(req, res, next) {
  res.status(200).send(req.body.data);
});

app.get('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

// app.post('/repos', function (req, res, next) {
//   // TODO - your code here!
//   // This route should take the github username provided
//   // and get the repo information from the github API, then
//   // save the repo information in the database
//   console.log('POST request received on server');
//   controller.githubAPI.getData(req, res, next);
// }, function(req, res, next) {
//   res.status(200).send(req.body.data);
// });

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

