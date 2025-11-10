const postRepo = require('../repositories/postRepository');

class PostService {
  create(userId, text, imageUrl) {
    return postRepo.create({ userId, text, imageUrl });
  }
  getAll() { return postRepo.getAll(); }
}
module.exports = new PostService();
