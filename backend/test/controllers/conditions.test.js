const { ConditionsController } = require('src/controllers')

describe('Conditions controller', () => {
  describe('getConditions', () => {
    it('Should get all conditions ', async () => {
      const conditions = await ConditionsController.getConditions()

      conditions.should.be.a('array')
      conditions[0].should.be.a('object')
      conditions.length.should.be.gte(0)
    })
  })
})
