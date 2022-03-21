const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    product: {
      type: String,
      require: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description: {
      type: String,
      require: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Open', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
