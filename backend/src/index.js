require('app-module-path/cwd')

const log = require('debugnyan')('app')
const { app } = require('src/app')

const port = process.env.PORT || 4000
const hostname = '0.0.0.0'

const server = app.listen(port, hostname, () => {
  log.debug(`hostname: ${hostname} listening at port: ${port}`)
})

// App close
process.on('SIGINT', () => {
  log.debug('##SIGINT##')
  server.close()
})

// Uncaught JavaScript exception
process.on('uncaughtException', (err) => {
  log.debug('##Caught exception##')
  log.debug(`${err}`)
})
