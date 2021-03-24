const { Users } = require('src/models')

describe('Auth interface', () => {
  describe('PORT /login', () => {
    it('Should login one user', async () => {
      const password = 'foobar'
      const doctor = await Users.create({
        email: `foobar${Math.random()}@do${Math.random()}.com`,
        password,
        title: 'foobar',
        name: 'johnDoe',
      })

      const response = await chai.request(app)
        .post('/api/login')
        .send({
          email: doctor.email,
          password,
        })

      response.should.have.status(200)
    })

    it('Should not login only with password', async () => {
      const password = 'foobar'
      const response = await chai.request(app)
        .post('/api/login')
        .send({
          password,
        })

      response.should.have.status(400)
    })
  })
})
