const express = require('express');
const router = express.Router();
const {
  create,
  list,
  read,
  listSearch,
  photo,
  listBySearch,
  remove,
  listSingleCompany,
  editSingleCompany,
  listStatus
} = require('../controllers/companyController');
const { runValidation } = require('../validators');
const { companyCreateValidator } = require('../validators/companyValidator');

router.get('/company', list);
router.get('/companies/:slug', read);
router.get('/company/search', listSearch);
// http://localhost:8000/api/company/search?search=kms

router.get('/company/photo/:slug', photo);
router.post('/company/by/search', listBySearch);

// ADMIN
router.post('/admin/company/create', create);
router.delete('/admin/company/delete/:slug', remove);
router.get('/admin/company/:slug', listSingleCompany);
router.put(
    "/admin/company/:slug",
    editSingleCompany
);
router.get('/admin/company/status/:status', listStatus);

module.exports = router;
