const body = require('koa-body')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const Koa = require('koa')
const Mongoose = require('mongoose')
const { get } = require('lodash')
const { routeLog } = require('src/middlewares')

const mongooseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const mongo_address = get(process.env, 'MONGO_ADDRESS', 'localhost')
const mongo_port = get(process.env, 'MONGO_PORT', '27017')
const mongo_db = get(process.env, 'MONGO_DB', 'gyant')
const mongo_user = get(process.env, 'MONGO_INITDB_ROOT_USERNAME')
const mongo_pass = get(process.env, 'MONGO_INITDB_ROOT_PASSWORD')

Mongoose.connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_address}:${mongo_port}/${mongo_db}?authSource=admin`, mongooseOptions)

const app = new Koa()
app.use(helmet())
app.use(cors())
app.use(routeLog)
app.use(body({
  parsedMethods: ['GET', 'POST', 'PUT', 'PATCH'],
}))

module.exports = { app }
