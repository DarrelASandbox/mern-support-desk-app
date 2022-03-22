const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Ticket',
    },
    note: {
      type: String,
      require: [true, 'Please add some text'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
