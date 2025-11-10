const Post = require('../models/Post');

class PostRepository {
  create(data) { return Post.create(data); }
  getAll() { return Post.find().sort({ createdAt: -1 }).populate('userId', 'name avatarUrl'); }
}
module.exports = new PostRepository();
