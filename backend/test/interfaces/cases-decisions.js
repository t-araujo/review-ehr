const { Cases, Conditions, Users } = require('src/models')

const helperToCreateCaseDecision = async () => {
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

  return {
    doctor,
    cas: cas,
    condition,
  }
}
describe('Decisions interface', () => {
  describe('GET /decisions', () => {
    it('Should get all decisions', async function () {
      const response = await chai.request(app)
        .get('/api/decisions')
        .set({ Authorization: `Bearer ${this.authenticatedUser().token}` })

      response.should.have.status(200)
    })
  })

  describe('POST /decisions', () => {
    it('Should create one case decision', async function () {
      const { cas, condition, doctor } = await helperToCreateCaseDecision()
      const response = await chai.request(app)
        .post('/api/decisions')
        .set({ Authorization: `Bearer ${this.authenticatedUser().token}` })
        .send({
          doctor_id: doctor._id,
          case_id: cas._id,
          label: condition.description,
        })

      response.should.have.status(201)
    })

    it('Should not create if data is not provided', async function () {
      const response = await chai.request(app)
        .post('/api/decisions')
        .set({ Authorization: `Bearer ${this.authenticatedUser().token}` })
        .send({
          doctor_id: 'adasdasd',
        })

      response.should.have.status(400)
    })
  })
})
