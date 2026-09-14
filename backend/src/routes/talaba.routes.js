const express = require('express');
const router = express.Router();
const talabaController = require('../controllers/talaba.controller');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');
const { createTalabaSchema, updateTalabaSchema } = require('../validations/talaba.validation');

router.get('/', talabaController.getAllUsers);
router.get('/:id', talabaController.getUserById);

router.post('/', authMiddleware, validate(createTalabaSchema), talabaController.createUser);
router.put('/:id', authMiddleware, validate(updateTalabaSchema), talabaController.updateUser);
router.delete('/:id', authMiddleware, talabaController.deleteUser);

module.exports = router;