const { AuthController } = require('src/controllers')
const { is, validate } = require('src/validation')

module.exports = (router) => {
  router.post('/login', async (ctx) => {
    const { email, password } = await validate(ctx.request.body,
      is.object({
        email: is.string().required(),
        password: is.string().required(),
      }).required()
    )

    ctx.response.body = await AuthController.login(email, password)
  })
}
