const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    sender_balance: {
      type: Number
    },
    recipient_balance: {
      type: Number
    },
    transaction_amount: {
      type: Number
    },
    balance: {
      type: Number
    },
    sender_new_balance: {
      type: Number
    },
    recipient_new_balance: {
      type: Number
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)
