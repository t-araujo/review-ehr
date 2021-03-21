const { CasesDecisionsController } = require('src/controllers')
const { is, validate } = require('src/validation')

module.exports = (router) => {
  router.get('/decisions', async (ctx) => {
    ctx.response.body = await CasesDecisionsController.getCasesDecisions()
  })

  router.post('/decisions', async (ctx) => {
    const { case_id, doctor_id, label } = await validate(ctx.request.body,
      is.object({
        doctor_id: is.string().required(),
        case_id: is.string().required(),
        label: is.string().required(),
      }).required()
    )

    ctx.status = 201
    ctx.response.body = await CasesDecisionsController.create(
      doctor_id,
      case_id,
      label
    )
  })
}
