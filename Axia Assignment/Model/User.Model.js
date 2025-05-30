const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    unique: true },
  password: String,
  isAdmin: { 
    type: Boolean, 
    default: false 
},
  hobbies: [String],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
