const HttpError = require('standard-http-error')
const { Cases, CasesDecisions, Conditions, Users } = require('src/models')

class CasesDecisionsController {
  static async getCasesDecisions () {
    return CasesDecisions.find({})
  }

  static async create (doctor_id, case_id, label) {
    const doctor = await Users.findOne({ _id: doctor_id })

    if (!doctor) {
      throw new HttpError(404, 'User not found')
    }

    const cases = await Cases.findOne({ _id: case_id })

    if (!cases) {
      throw new HttpError(404, 'Case not found')
    }

    const condition = await Conditions.findOne({ description: label })

    if (!condition) {
      throw new HttpError(404, 'Condition not found')
    }

    return CasesDecisions.create({
      case_id,
      doctor_id,
      label,
    })
  }
}

module.exports = CasesDecisionsController
