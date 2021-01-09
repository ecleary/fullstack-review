const github = require('../../helpers/github.js');

module.exports.getData = (req, res, next) => {
  const {term} = req.body;
  github.getReposByUsername(term, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      req.body = {data};
      next();
    }
  });
};
