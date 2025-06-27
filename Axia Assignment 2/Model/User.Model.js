const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  hobbies: { type: [String], default: [] },
  
  kyc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KYC',
    unique: true
  },

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
