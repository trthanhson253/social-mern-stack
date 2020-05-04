const Request = require('../models/request');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name, email, reason, content } = req.body;
  console.log(name);
  let requestModel = new Request({
    name,
    email,
    reason,
    content,
  });
  requestModel.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Request.find({})
    .sort({ createdAt: '-1' })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const requestId = req.params.requestId;
  Request.findOneAndRemove({ requestId }, { status: 0 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Request Not Found',
      });
    }
    res.json({
      message: 'Request deleted successfully',
    });
  });
};
