const { Conditions } = require('src/models')

class ConditionsController {
  static async getConditions () {
    return Conditions.find({})
  }
}

module.exports = ConditionsController
