const mongoose = require('mongoose')
const { Cases, CasesDecisions, Conditions, Users } = require('src/models')
const { CasesDecisionsController } = require('src/controllers')

const createCaseDecision = async () => {
  const doctor = await Users.create({
    email: `foobar${Math.random()}@do${Math.random()}.com`,
    password: 'foobar',
    title: 'foobar',
    name: 'johnDoe',
  })

  const cas = await Cases.create({
    description: 'foobar',
  })

  await CasesDecisions.create({
    case_id: cas._id,
    doctor_id: doctor._id,
    label: 'very very sick',
  })
}

describe('Cases decisions controller', () => {
  describe('getCasesDecisions', () => {
    it('Should get all Cases decisions', async () => {
      await createCaseDecision()
      const cases = await CasesDecisionsController.getCasesDecisions()

      cases.should.be.a('array')
      cases[0].should.be.a('object')
      cases.length.should.be.gte(0)
    })
  })

  describe('create', () => {
    it('Should create one case decision', async () => {
      const doctor = await Users.create({
        email: `foobar${Math.random()}@do${Math.random()}.com`,
        password: 'foobar',
        title: 'foobar',
        name: 'johnDoe',
      })

      const cas = await Cases.create({
        description: 'foobar',
      })

      const condition = await Conditions.create({
        code: 'foobaz',
        description: 'foobaz',
      })

      const case_decision = await CasesDecisionsController.create(
        doctor._id,
        cas._id,
        condition.description
      )

      case_decision.should.be.a('object')
      case_decision.doctor_id.should.be.deep.equal(doctor._id)
    })

    it('Should not create one case decision if doctor id doesn\'t exist', async () => {
      try {
        await CasesDecisionsController.create(
          mongoose.Types.ObjectId(),
          mongoose.Types.ObjectId(),
          '123123'
        )
      } catch (error) {
        error.code.should.deep.equal(404)
      }
    })
  })
})
