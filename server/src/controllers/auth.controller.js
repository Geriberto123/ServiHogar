const { registerUser, loginUser } = require('../services/auth.service');

async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
