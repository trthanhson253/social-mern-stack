const Comment = require('../models/comment');
const Company = require('../models/company');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name, position, point, content, company } = req.body;
  console.log(name);
  Company.findOne({ name: company }).exec((err, companyAdding) => {
    if (err || !companyAdding) {
      return res.status(400).json({
        error: 'Company not found',
      });
    }
    let company = companyAdding._id;
    let commentModel = new Comment({
      name,
      position,
      point,
      content,
      company,
    });
    commentModel.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  });
};

exports.like = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const newLikes = {
      name: req.body.name,
    };

    comment.likes.unshift(newLikes);

    await comment.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.reply = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const newReply = {
      name: req.body.name,
      content: req.body.content,
    };

    comment.reply.unshift(newReply);

    await comment.save();

    res.json(comment.reply);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.violate = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const newViolate = {
      content: req.body.content,
    };

    comment.violate.unshift(newViolate);

    await comment.save();

    res.json(comment.reply);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.averageRating = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const company = await Company.findOne({ slug });
  var companyId = company._id;
  const comments = await Comment.find({ company: companyId });
  var sum = 0;
  var result = 0;
  for (var i = 0; i < comments.length; i++) {
    sum += comments[i].point;
  }
  if (comments.length > 0) {
    result = sum / comments.length;
  } else {
    result = 0;
  }
  res.send({ result });
};

exports.list = (req, res) => {
  Comment.find({}).sort({ createdAt: -1 }).select(
    '_id name point content createdAt updatedAt'
  ).populate('company', '_id name slug').limit(7).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Comment Not Found',
      });
    }
    res.json(data);
  });
};