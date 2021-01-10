const database = require('../../database');
const Repo = database.Repo;
const transform = require('./transform.js');

module.exports.getReposById = (repoIdList, callback) => {
  Repo.find({$or: repoIdList}, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports.postData = (data, callback) => {
  data = transform.transformGitHubDataForDB(data);
  // Repo.create(data, (err, res) => {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(null, res);
  //   }
  // });
  transform.deleteExistingRecordsForReposting(data, (err, data) => {
    if (err) {
      callback(err);
    } else {
      Repo.create(data, (err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    }
  });
};

module.exports.deleteRepos = (_idsToDelete, callback) => {
  Repo.deleteMany({$or: _idsToDelete}, (err, res) => {
    if (err) {
      callback(err);
    } else {
      // console.log('---------------- module.exports.deleteRepos res:');
      // console.log(res);
      callback(null, res);
    }
  });
};

module.exports.patchRepos = (data, callback) => {
  //
  Repo.updateMany({_id: id}, data, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
