const compose = require('koa-compose')
const { authError, fallbackError, httpError, joiError } = require('src/error_mappers')

function tryCatchMiddleware (cb) {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      return cb(ctx, next, error)
    }
  }
}

const middlewares = [
  tryCatchMiddleware((ctx, next, error) => {
    const errors = fallbackError(error)

    ctx.response.status = 500
    ctx.response.body = {
      errors,
    }
  }),
  tryCatchMiddleware((ctx, next, error) => {
    const errors = httpError(error)

    ctx.response.status = error.code
    ctx.response.body = {
      errors,
    }
  }),
  tryCatchMiddleware((ctx, next, error) => {
    const errors = joiError(error)

    ctx.response.status = 400
    ctx.response.body = {
      errors,
    }
  }),
  tryCatchMiddleware((ctx, next, error) => {
    const errors = authError(error)

    ctx.response.status = 401
    ctx.response.body = {
      errors,
    }
  }),
]

module.exports = () => compose(middlewares)
