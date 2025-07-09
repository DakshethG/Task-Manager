const express = require('express');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const { getUsers, getUsersById, deleteUser } = require('../controllers/userController');

const router = express.Router();

//User Management Routes
router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, getUsersById);

module.exports = router;