const express = require('express');
const router = express.Router();
const {
  CreateUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../Controllers/User.Controllers');

router.post('/register', CreateUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
