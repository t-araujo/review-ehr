const { ConditionsController } = require('src/controllers')

module.exports = (router) => {
  router.get('/conditions', async (ctx) => {
    ctx.response.body = await ConditionsController.getConditions()
  })
}
