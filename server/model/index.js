const database = require('../../database');
const Repo = database.Repo;
const {transformGitHubDataForDB} = require('./transform.js');

module.exports.postData = (data, callback) => {
  data = transformGitHubDataForDB(data);
  Repo.create(data, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
