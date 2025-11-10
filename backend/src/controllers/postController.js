const postService = require('../services/postService');

exports.create = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    const post = await Post.create({
      userId: req.userId,
      text: req.body.text,
      imageUrl,
    });
    const populated = await post.populate('userId', 'name');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAll = async (req, res) => {
  try { res.json(await postService.getAll()); }
  catch (err) { res.status(400).json({ message: err.message }); }
};

const Post = require('../models/Post');

exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.userId;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
