const Mongoose = require('mongoose')

const casesDecisionsSchema = new Mongoose.Schema(
  {
    case_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
    },
    doctor_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

Mongoose.model('CasesDecisions', casesDecisionsSchema)

module.exports = Mongoose.model('CasesDecisions')
