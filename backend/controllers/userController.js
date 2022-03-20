const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields.');
  } else res.json('Success');
});

const loginUser = asyncHandler(async (req, res) => res.send('login'));

module.exports = { registerUser, loginUser };