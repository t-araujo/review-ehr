const Mongoose = require('mongoose')

const conditionsSchema = new Mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

Mongoose.model('Conditions', conditionsSchema)

module.exports = Mongoose.model('Conditions')
