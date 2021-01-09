const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // axios(method); // <-- Why??
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET'.toLowerCase(),
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options)
  .then((response) => {
    // console.log(`Successful response from GitHub API:`);
    // console.log(response);
    const {data} = response;
    callback(null, data);
  })
  .catch((err) => {
    // console.log(`Error from GitHub API:`);
    // console.log(err);
    callback(err);
  });
};

module.exports.getReposByUsername = getReposByUsername;
