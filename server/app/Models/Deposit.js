const mongoose = require('mongoose')

const accountSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    transaction_id: {
      type: String
    },
    amount: {
      type: Number
    },
    block_id: {
      type: String
    },
    confirmation_checks: {
      type: Number
    },
    is_confirmed: {
      type: Number
    },
    memo: {
      type: String
    },
    sender: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Account', accountSchema)
