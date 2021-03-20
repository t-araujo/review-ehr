const { CasesController } = require('src/controllers')

describe('Cases controller', () => {
  describe('getCases', () => {
    it('Should get all Cases ', async () => {
      const cases = await CasesController.getCases()

      cases.should.be.a('array')
      cases[0].should.be.a('object')
      cases.length.should.be.gte(0)
    })
  })
})
