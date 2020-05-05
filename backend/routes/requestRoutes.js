const express = require('express');
const router = express.Router();
const {
  create,
  list,
  remove,
  toggle,
} = require('../controllers/requestController');
// const { runValidation } = require('../validators');
// const { companyCreateValidator } = require('../validators/companyValidator');

router.post('/request/create', create);
router.get('/admin/request', list);
router.delete('/admin/request/delete/:idRequest', remove);
router.get('/admin/request/:idRequest/:status1', toggle);

module.exports = router;
