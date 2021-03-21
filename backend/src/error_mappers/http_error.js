const HttpError = require('standard-http-error')
const { get, invert, snakeCase } = require('lodash')

const codes = invert(HttpError)

module.exports = (error) => {
  if (!(error instanceof HttpError)) {
    throw error
  }
  return [{
    code: snakeCase(get(codes, error.code, 'custom')),
    message: error.message,
  }]
}
