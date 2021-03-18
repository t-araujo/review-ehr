const log = require('debugnyan')('app')

module.exports = async (ctx, next) => {
  const now = new Date()

  await next()
  const log_data = {
    middleware: `route_log`,
    method: ctx.request.method,
    url: ctx.request.url,
    request_body: ctx.request.body,
    status: ctx.response.status,
    time_diff_ms: new Date() - now,
  }

  log.debug(log_data)
}
