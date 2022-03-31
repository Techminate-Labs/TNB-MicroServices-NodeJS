const mongoose = require('mongoose')

const withdrawSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    account_number: {
      type: String
    },
    balance: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Withdraw', withdrawSchema)
