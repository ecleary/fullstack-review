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
      // const reposToAdd = [];
      for (var i = 0; i < dataFromGitHub.length; i++) {
        for (var j = 0; j < dataFromDb.length; j++) {
          if (dataFromGitHub[i].repoId === dataFromDb[j].repoId) {
            const _id = {_id: dataFromDb[j]._id};
            _idsToDelete.push(_id);
            break;
          } // else if (j === dataFromDb.length - 1) {
          //   reposToAdd.push(dataFromGitHub[i]);
          //   break;
          // }
        }
      }
      // console.log('_idsToDelete:');
      // console.log(_idsToDelete);
      // // console.log('reposToAdd:');
      // // console.log(reposToAdd);
      // callback('forced error for testing');
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
