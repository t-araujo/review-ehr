const Mongoose = require('mongoose')

const casesSchema = new Mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

Mongoose.model('Cases', casesSchema)

module.exports = Mongoose.model('Cases')
