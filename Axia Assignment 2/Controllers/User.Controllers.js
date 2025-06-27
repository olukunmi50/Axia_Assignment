const User = require('../Model/User.Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const CreateUser = async (req, res) => {
  const { name, email, password, ...others } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      ...others
    });

    const savedUser = await newUser.save();
    const { password: _, ...userData } = savedUser._doc; // Exclude password

    res.status(201).json(userData);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found. Please register." });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid password. Please try again." });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userData } = user._doc;
    res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json({ ...userData, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: "Login failed. Try again later." });
  }
};

// Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ error: "Could not retrieve users." });
  }
};

// Update user info
const updateUser = async (req, res) => {
  const { id, ...updates } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ error: "User not found." });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: "Could not update user." });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: "Could not delete user." });
  }
};

module.exports = {
  CreateUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser
};
