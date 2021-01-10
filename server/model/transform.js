module.exports.transformGitHubDataForDB = data => {
  const transformedData = [];
  for (let i = 0; i < data.length; i++) {
    const dataPoint = data[i];
    const repo = {
      info: {
        id: dataPoint.id,
        name: dataPoint.name,
        description: dataPoint.description,
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
