const express = require('express');
const router = express.Router();

const authorize = require('../Middleware/authMiddleware');
const {
  CreateUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../Controllers/User.Controllers');

// Public routes
router.post('/register', CreateUser);
router.post('/login', loginUser);

// Authenticated routes
router.get('/', authorize, getAllUsers);             
router.put('/:id', authorize, updateUser);           
router.delete('/:id', authorize, deleteUser);        


module.exports = router;
