const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });

  if (user)
    return res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email });

  res.status(400);
  throw new Error('Invalid user data.');
});

const loginUser = asyncHandler(async (req, res) => res.send('login'));

module.exports = { registerUser, loginUser };
