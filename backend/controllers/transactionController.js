// controllers/transactionController.js
const Transaction = require('../models/Transaction');

// @desc    Get all transactions for logged in user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    // req.user.id comes from the 'protect' middleware
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res) => {
  try {
    // Get categoryIcon from the request body
    const { description, amount, categoryIcon } = req.body;

    if (!description || !amount) {
      return res.status(400).json({ success: false, error: 'Description and amount are required' });
    }

    const transaction = await Transaction.create({
      description,
      amount,
      categoryIcon, // Save the icon
      type: amount > 0 ? 'income' : 'expense',
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }

    // Check if transaction belongs to the user
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await Transaction.deleteOne({ _id: req.params.id }); 

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err); // Log the specific error to the console
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
// exports.deleteTransaction = async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({ success: false, error: 'No transaction found' });
//     }

//     // Check if transaction belongs to the user
//     if (transaction.user.toString() !== req.user.id) {
//       return res.status(401).json({ success: false, error: 'Not authorized' });
//     }

//     await transaction.remove();
//     res.status(200).json({ success: true, data: {} });
//   } catch (err) {
//     res.status(500).json({ success: false, error: 'Server Error' });
//   }
// };