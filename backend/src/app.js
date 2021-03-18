const body = require('koa-body')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const Koa = require('koa')

const app = new Koa()
app.use(helmet())
app.use(cors())
app.use(body({
  parsedMethods: ['GET', 'POST', 'PUT', 'PATCH'],
}))

module.exports = { app }
