const express = require('express');
const router = express.Router();
const {
  getCommentsById,
  createComment,
} = require('../controllers/Comment.controller');

router.get('/', getCommentsById);
router.post('/create', createComment);

module.exports = router;
