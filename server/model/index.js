const database = require('../../database');
const Repo = database.Repo;
const transform = require('./transform.js');

module.exports.getData = (callback) => {
  Repo.find({}, (err, res) => {
    if (err) {
      callback(err);
    } else {
      const data = transform.filterTop25Records(res);
      callback(null, data);
      // transform.filterTop25Records(res, (err, data) => {
      //   if (err) {
      //     callback(err);
      //   } else {
      //     callback(null, data);
      //   }
      // });
    }
  });
};

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
      console.log(res);
      callback(null, res);
    }
  });
};

module.exports.deleteByUsername = (username, callback) => {
  Repo.deleteMany({"owner.username": username}, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log(res);
      callback(null, res);
    }
  });
};

// module.exports.patchRepos = (data, callback) => {
//   Repo.updateMany({_id: id}, data, (err, res) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, res);
//     }
//   });
// };
