const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name required.'],
    },
    email: {
      type: String,
      require: [true, 'Email required.'],
      unqiue: true,
    },
    password: {
      type: String,
      require: [true, 'Password required.'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // array of objects
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  this.tokens = [...this.tokens, { token }];
  await this.save();
  return token;
};

module.exports = mongoose.model('User', userSchema);
