const Router = require('@koa/router')

const modules = [
  require('./cases'),
  require('./cases-decisions'),
  require('./conditions'),
  require('./auth'),
]

module.exports = (app) => {
  const router = new Router({ prefix: '/api' })

  for (const module of modules) {
    module(router)
  }

  app.use(router.routes(), router.allowedMethods())
}
