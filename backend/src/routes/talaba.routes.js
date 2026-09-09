const express = require('express');
const router = express.Router();
const talabaController = require('../controllers/talaba.controller');
const validate = require('../middlewares/validate');
const { createTalabaSchema, updateTalabaSchema } = require('../validations/talaba.validation')

router.get('/', talabaController.getAllUsers);
router.get('/:id', talabaController.getUserById);
router.post('/', validate(createTalabaSchema), talabaController.createUser);
router.put('/:id', validate(updateTalabaSchema), talabaController.updateUser);
router.delete('/:id', talabaController.deleteUser);

module.exports = router;