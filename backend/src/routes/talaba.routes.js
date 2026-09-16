const express = require('express');
const router = express.Router();
const talabaController = require('../controllers/talaba.controller');
const validate = require('../middlewares/validate');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth');
const { createTalabaSchema, updateTalabaSchema } = require('../validations/talaba.validation');

router.get('/', talabaController.getAllUsers);

// me ni id dan oldin yozish kerak, aks holda express me ni id deb qabul qiladi
router.get('/me', authMiddleware, talabaController.getMe);

router.post(
  '/me/avatar',
  authMiddleware,
  upload.single('avatar'),
  talabaController.uploadAvatar
);

router.get('/:id', talabaController.getUserById);

router.post('/', authMiddleware, validate(createTalabaSchema), talabaController.createUser);
router.put('/:id', authMiddleware, validate(updateTalabaSchema), talabaController.updateUser);
router.delete('/:id', authMiddleware, talabaController.deleteUser);

module.exports = router;