const Post = require('../Model/Post.Model');

const createPost = async (req, res) => {
  const { title, desc, content } = req.body;
  const { id } = req.user;

  if (!title || !desc || !content) {
    return res.status(400).json({ error: "Title, description, and content are required." });
  }

  try {
    const newPost = new Post({
      title,
      desc,
      content,
      author: id
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ error: "Failed to create post." });
  }
};

const getMyPosts = async (req, res) => {
  const { id } = req.user;

  try {
    const posts = await Post.find({ author: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Fetch posts error:", err);
    res.status(500).json({ error: "Failed to retrieve posts." });
  }
};

module.exports = { createPost, getMyPosts };
