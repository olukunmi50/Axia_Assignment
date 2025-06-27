const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 5 },
  desc: { type: String, required: true, trim: true, minlength: 10 },
  content: { type: String, required: true, minlength: 20 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: { type: [String], default: [] }
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
