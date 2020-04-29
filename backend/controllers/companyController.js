const Company = require('../models/company');
const Comment = require('../models/comment');
const formidable = require('formidable');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const _ = require('lodash');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not upload',
      });
    }

    const { name, type, city, state } = fields;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    let company = new Company();
    company.name = name;
    company.type = type;
    company.city = city;
    company.state = state;
    company.slug = slugify(name).toLowerCase();

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less then 1mb in size',
        });
      }
      company.photo.data = fs.readFileSync(files.photo.path);
      company.photo.contentType = files.photo.type;
    }

    company.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

// exports.list = (req, res) => {
//   Company.find({}).sort({ createdAt: -1 }).exec((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err),
//       });
//     }
//     res.json(data);
//   });
// };

exports.list = (req, res) => {
  Comment.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Not Found Comment",
      });
    }
    Company.find({ })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Not Found Company",
        });
      }
      res.json(data);
    });
  });
};

exports.read = (req, res) => {
  const slug = req.params.name.toLowerCase();
  Company.findOne({ slug }).exec((err, company) => {
    if (err) {
      return res.status(400).json({
        error: "Not Found",
      });
    }
    // res.json(category);
    Comment.find({ company: company })
      .populate('company', '_id name slug')
      .sort({ createdAt: -1 })
      .select(
        '_id name position point content likes reply violate createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({ company: company, comment: data });
      });
  });
};

// exports.searchCompany = (req, res) => {
//   const { keyword } = req.body;
//   if (keyword.trim() != '') {
//     Company.find({ name: { $regex: keyword, $options: 'i' } })
//       .limit(10)
//       .exec((err, data) => {
//         if (err) {
//           return res.status(400).json({
//             error: errorHandler(err),
//           });
//         }
//         res.json(data);
//       });
//   }
// };

exports.listSearch = (req, res) => {
  const { search } = req.query;
  console.log(search);
  if (search) {
    Company.find({ name: { $regex: search, $options: 'i' } })
      .limit(10)
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Not Found',
          });
        }
        res.json(data);
      });
  }
};

exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Company.findOne({ slug })
    .select('photo')
    .exec((err, company) => {
      if (err || !company) {
        return res.status(400).json({
          error: 'Company not found',
        });
      }
      res.set('Content-Type', company.photo.contentType);
      return res.send(company.photo.data);
    });
};
