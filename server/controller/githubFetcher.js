const model = require('../model');

module.exports.getData = (req, res, next) => {
  model.getData((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

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

module.exports.deleteData = (req, res, next) => {
  const {term} = req.body;
  model.deleteByUsername(term, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};
