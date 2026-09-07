const express = require('express');
const router = express.Router();
const talabaController = require('../controllers/talaba.controller');

router.get('/', talabaController.getAllUsers);
router.get('/:id', talabaController.getUserById);
router.post('/', talabaController.createUser);
router.put('/:id', talabaController.updateUser);
router.delete('/:id', talabaController.deleteUser);

module.exports = router;