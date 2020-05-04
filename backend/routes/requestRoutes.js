const express = require('express');
const router = express.Router();
const { create, list, remove } = require('../controllers/requestController');
// const { runValidation } = require('../validators');
// const { companyCreateValidator } = require('../validators/companyValidator');

router.post('/request/create', create);
router.get('/admin/request/create', list);
router.delete('/admin/request/delete/:requestId', remove);

module.exports = router;
