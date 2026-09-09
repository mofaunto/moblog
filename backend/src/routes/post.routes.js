const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const validate = require('../middlewares/validate');
const { createPostSchema, updatePostSchema } = require('../validations/post.validation');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', validate(createPostSchema), postController.createPost);
router.put('/:id', validate(updatePostSchema), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;