const model = require('./index.js');

module.exports.transformGitHubDataForDB = data => {
  const transformedData = [];
  for (let i = 0; i < data.length; i++) {
    const dataPoint = data[i];
    const repo = {
      repoId: typeof dataPoint.id === 'string' ? dataPoint.id : dataPoint.id.toString(),
      info: {
        name: dataPoint.name,
        description: dataPoint.description !== null ? dataPoint.description : 'NULL',
        url: dataPoint.html_url
      },
      owner: {
        userId: dataPoint.owner.id,
        username: dataPoint.owner.login
      },
      stats: {
        stargazersCount: dataPoint.stargazers_count,
        watchersCount: dataPoint.watchers_count,
        forksCount: dataPoint.forks_count
      }
    };
    transformedData.push(repo);
  }
  return transformedData;
};

module.exports.deleteExistingRecordsForReposting = (dataFromGitHub, callback) => {
  const repoIdList = [];
  for (var i = 0; i < dataFromGitHub.length; i++) {
    const repoId = {repoId: dataFromGitHub[i].repoId};
    repoIdList.push(repoId);
  }
  model.getReposById(repoIdList, (err, dataFromDb) => {
    if (err) {
      callback(err);
    } else {
      const _idsToDelete = [];
      for (var i = 0; i < dataFromGitHub.length; i++) {
        for (var j = 0; j < dataFromDb.length; j++) {
          if (dataFromGitHub[i].repoId === dataFromDb[j].repoId) {
            const _id = {_id: dataFromDb[j]._id};
            _idsToDelete.push(_id);
            break;
          }
        }
      }
      if (_idsToDelete.length > 0) {
        model.deleteRepos(_idsToDelete, (err, data) => {
          if (err) {
            callback(err);
          } else {
            callback(null, dataFromGitHub);
          }
        });
      } else {
        callback(null, dataFromGitHub);
      }
    }
  });
};

module.exports.filterTop25Records = (data) => {
  let sortedData = data.slice();
  sortedData.sort((record1, record2) => {
    const stats1 = record1.stats;
    const stats2 = record2.stats;
    const total1 = stats1.stargazersCount + stats1.watchersCount + stats1.forksCount;
    const total2 = stats2.stargazersCount + stats2.watchersCount + stats2.forksCount;
    if (total1 < total2) {
      return 1;
    } else if (total1 > total2) {
      return -1;
    } else {
      return 0;
    }
  });
  sortedData = sortedData.slice(0, 25);
  return sortedData;
};
