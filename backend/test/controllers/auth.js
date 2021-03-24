const { AuthController } = require('src/controllers')
const { Users } = require('src/models')

describe('Auth controller', () => {
  describe('login', () => {
    it('Should login one user', async () => {
      const email = `foobar${Math.random()}@do${Math.random()}.com`
      const password = '12345'
      const user = await Users.create({
        email,
        password,
        title: 'Dr.',
        name: 'johnDoe',
      })

      const userLogged = await AuthController.login(email, password)

      user.email.should.be.deep.equal(userLogged.email)
      userLogged.should.includes.keys(['token'])
    })

    it('Should not login when password doesnt match', async () => {
      const email = `foobar${Math.random()}@do${Math.random()}.com`
      const password = '12345'

      await Users.create({
        email,
        password,
        title: 'Dr.',
        name: 'johnDoe',
      })

      try {
        await AuthController.login(email, '123')
      } catch (error) {
        error.code.should.be.deep.equal(400)
      }
    })

    it('Should not found user', async () => {
      const email = `foobar${Math.random()}@do${Math.random()}.com`
      const password = '12345'

      try {
        await AuthController.login(email, password)
      } catch (error) {
        error.code.should.be.deep.equal(404)
      }
    })
  })
})
