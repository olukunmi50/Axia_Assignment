const User = require('../Model/User.Model');
const bcrypt = require('bcryptjs');

const CreateUser = async (req, res) => {
 const { name, email, password, ...others} = req.body;
 if (!name || !email || !password) {
    return res.json({ message: 'Name and email are required' });
 }
 //check if user already exists
 const isUser = await User.findOne({ email });
 if (isUser ) {
    return res.send ({ message: 'User already exists, Please login' });
 }
 const salt = bcrypt.genSaltSync(10);
 const hashedPassword = bcrypt.hashSync(password, salt);
 console.log(hashedPassword);
 // continue with user creation
 try {
    const newUser = new User({email, password: hashedPassword, name, ...others});
    const savedUser = await newUser.save();
    return res.json(savedUser);
 } catch (error) {
    console.log(error.message);
    return res.send({ message: 'Error creating user' });
 }
 }


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // get user from database
    const user = await User.findOne({ email });
    if (!user) { 
        return res.send("User not found, please register");
    }
  // compare password
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.send("Invalid password, please try again");
    }
    // if valid, return user data
    res.json({ id:user.id ,name : user.name, email: user.email });
  } 
  


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
    const { id, ...others } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {...others}, {     new: true });
    return res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    const { id } = req.body;
    const deletedUser = await User.findByIdAndDelete(id);
    return res.json(deletedUser);
};

module.exports = {
  CreateUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
