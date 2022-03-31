const mongoose = require('mongoose')

const scantrackerSchema = mongoose.Schema(
  {
    last_scanned: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Scantracker', scantrackerSchema)
