const express = require('express');
const router = express.Router();
const {
  create,
  like,
  reply,
  violate,
  averageRating,
  list
} = require('../controllers/commentController');
const { runValidation } = require('../validators');
const { commentCreateValidator } = require('../validators/commentValidator');

router.post('/comment', commentCreateValidator, runValidation, create);
router.get('/comment', list);
router.put('/like/:id', like);
router.post('/reply/:id', reply);
router.post('/violate/:id', violate);

router.get('/averageRating/:slug', averageRating);

module.exports = router;
