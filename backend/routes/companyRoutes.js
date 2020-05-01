const express = require('express');
const router = express.Router();
const {
  create,
  list,
  read,
  listSearch,
  photo,
  listBySearch
} = require('../controllers/companyController');
const { runValidation } = require('../validators');
const { companyCreateValidator } = require('../validators/companyValidator');

router.post('/company', create);
router.get('/company', list);
router.get('/companies/:name', read);
router.get('/company/search', listSearch);
// http://localhost:8000/api/company/search?search=kms

router.get('/company/photo/:slug', photo);
router.post("/company/by/search", listBySearch);

module.exports = router;
