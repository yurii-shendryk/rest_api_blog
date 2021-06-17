const express = require('express');
const router = express.Router();

const {
  validateCreatePost,
} = require('../middlewares/validation/postsValidation');

const modelsMiddleware = require('../middlewares/models');

const {
  getAllPosts,
  getPostById,
  addPost,
  changePost,
  removePost,
} = require('../controllers/postsController');

const { asyncWrapper } = require('../helpers/apiHelpers');

router.use(modelsMiddleware);

router.get('/', asyncWrapper(getAllPosts));

router.get('/:id', asyncWrapper(getPostById));

router.post('/', validateCreatePost, asyncWrapper(addPost));

router.put('/:id', validateCreatePost, asyncWrapper(changePost));

router.delete('/:id', asyncWrapper(removePost));

module.exports = { router };
