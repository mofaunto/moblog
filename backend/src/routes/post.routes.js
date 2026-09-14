const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');
const { createPostSchema, updatePostSchema } = require('../validations/post.validation');

// ochiq api lar
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// muhofaza qilingan apilar
router.post('/', authMiddleware, validate(createPostSchema), postController.createPost);
router.put('/:id', authMiddleware, validate(updatePostSchema), postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;