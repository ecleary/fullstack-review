const model = require('../model');

module.exports.postData = (req, res, next) => {
  const {data} = req.body;
  model.postData(data, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};
