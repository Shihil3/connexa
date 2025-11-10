const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');
const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  async signup({ name, email, password }) {
    if (await userRepo.findByEmail(email)) throw new Error('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = await userRepo.create({ name, email, passwordHash: hash });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return { token, user };
  }

  async login({ email, password }) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return { token, user };
  }
}
module.exports = new AuthService();
