const { Cases, CasesDecisions } = require('src/models')

class CasesController {
  static async getCases () {
    return Cases.find({})
  }

  static async getCasesWithoutDecisions () {
    const cases_decisions = await CasesDecisions.find({})
    const casesids = cases_decisions.map((cas) => cas.case_id)
    const cases = await Cases.find().where('_id').nin(casesids).exec()
    return cases
  }
}

module.exports = CasesController
