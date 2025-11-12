// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links this to the User model
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    // 'type' helps us easily query for 'income' or 'expense'
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'], // Must be one of these values
    },
    categoryIcon: {
      type: String,
      default: '⭕', // Default icon if none selected
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);