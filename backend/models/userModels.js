const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
