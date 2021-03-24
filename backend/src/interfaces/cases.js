const { CasesController } = require('src/controllers')

module.exports = (router) => {
  router.get('/cases', async (ctx) => {
    if (ctx.request.query.withoutdecisions) {
      ctx.response.body = await CasesController.getCasesWithoutDecisions()

      return
    }

    ctx.response.body = await CasesController.getCases()
  })
}
