const { app } = require('src/app')
const { Users } = require('src/models')

before(async function () {
  global.app = app.listen()

  const body = {
    email: `foobar${Math.random()}@do${Math.random()}.com`,
    password: 'foobar',
  }

  await Users.create({
    email: body.email,
    password: body.password,
    title: 'Dr',
    name: 'patient3',
  })

  const response = await chai.request(global.app)
    .post('/api/login')
    .send(body)

  this.authenticatedUser = function () { return response.body }
})

after(async () => {
  await global.app.close()
})
