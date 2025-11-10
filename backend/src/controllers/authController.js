const authService = require('../services/authService');

exports.signup = async (req, res) => {
  try { res.json(await authService.signup(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
};

exports.login = async (req, res) => {
  try { res.json(await authService.login(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
