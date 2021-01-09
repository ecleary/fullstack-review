const express = require('express');
const controller = require('./controller');

const router = module.exports.router = express.Router();

router.post('/repos', function (req, res, next) {
  console.log('POST request received on server');
  controller.githubAPI.getData(req, res, next);
}, function(req, res, next) {
  controller.githubFetcher.postData(req, res, next);
});

router.get('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

