const User = require('../models/User');

class UserRepository {
  findByEmail(email) { return User.findOne({ email }); }
  create(data) { return User.create(data); }
  findById(id) { return User.findById(id); }
}
module.exports = new UserRepository();
