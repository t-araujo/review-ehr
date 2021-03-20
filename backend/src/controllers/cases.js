const { Cases } = require('src/models')

class CasesController {
  static async getCases () {
    return Cases.find({})
  }
}

module.exports = CasesController
