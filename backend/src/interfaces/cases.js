const { CasesController } = require('src/controllers')

module.exports = (router) => {
  router.get('/cases', async (ctx) => {
    ctx.response.body = await CasesController.getCases()
  })
}
