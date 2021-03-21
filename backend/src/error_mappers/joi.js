const { get, isNil, join, omitBy, trim } = require('lodash')

// This function turns a Joi path such as ['foo', 'bar'] into 'foo.bar'
// and ['foo', 0, 'bar'] into 'foo[0].bar'.
function mapPath (path) {
  let res = ''

  for (const e of path) {
    if (e >= 0) {
      res += `[${e}]`
    } else if (res === '') {
      res = e
    } else {
      res += '.' + e
    }
  }
  return res
}

function joiErrorMap ({ context, message, type }) {
  const errors = {
    'array.base': () => ({
      code: 'invalid',
      message: 'must be an array',
    }),
    'array.asc': () => ({
      code: 'ascending',
      message: 'must be an ascending order array',
    }),
    'array.desc': () => ({
      code: 'descending',
      message: 'must be a descending order array',
    }),
    'array.min': ({ context }) => ({
      code: 'minimum',
      message: `should have at least ${context.limit} items`,
      context: {
        value: context.limit,
      },
    }),
    'array.max': () => ({
      code: 'maximum',
      message: `should have at most ${context.limit} items`,
      context: {
        value: context.limit,
      },
    }),
    'boolean.base': () => ({
      code: 'boolean',
      message: 'must be a boolean',
    }),
    'string.min': ({ context }) => ({
      code: 'minimum',
      message: `should be at least ${context.limit} characters long`,
      context: {
        value: context.limit,
      },
    }),
    'string.max': ({ context }) => ({
      code: 'maximum',
      message: `should be at most ${context.limit} characters long`,
      context: {
        value: context.limit,
      },
    }),
    'string.regex.name': ({ context }) => ({
      code: 'regex',
      message: `${context.name} regex mismatch`,
    }),
    'string.regex.base': ({ context }) => ({
      code: 'regex',
      message: `regex mismatch`,
    }),
    'string.timezone': () => ({
      code: 'timezone',
      message: 'unknown timezone',
    }),
    'object.and': ({ context }) => ({
      code: 'dependency',
      message: `requires fields [${context.missing.join(',')}]`,
      path: context.present,
    }),
    'any.required': () => ({
      code: 'required',
      message: 'is required',
    }),
    'any.empty': () => ({
      code: 'empty',
      message: 'cannot be empty',
    }),
    'email.nondisposable': () => ({
      code: 'email.nondisposable',
      message: `can't be disposable`,
    }),
    'string.base': () => ({
      code: 'string',
      message: 'must be a string',
    }),
    'string.email': () => ({
      code: 'email',
      message: 'must be a valid email',
    }),
    'object.base': () => ({
      code: 'object',
      message: 'must be an object',
    }),
    'any.invalid': () => ({
      code: 'invalid',
      message: 'value is invalid',
    }),
    'number.base': () => ({
      code: 'number',
      message: 'must be a number',
    }),
    'number.integer': () => ({
      code: 'integer',
      message: 'must be an integer number',
    }),
    'number.min': ({ context }) => ({
      code: 'minimum',
      message: `must be equal or greater than ${context.limit}`,
      context: {
        value: context.limit,
      },
    }),
    'number.max': ({ context }) => ({
      code: 'maximum',
      message: `should be at most ${context.limit}`,
      context: {
        value: context.limit,
      },
    }),
    'any.unknown': () => ({
      code: 'invalid',
      message: 'is invalid',
    }),
    'any.allowOnly': ({ context }) => ({
      code: 'invalid',
      message: `allowed values are [${join(context.valids, ',')}]`,
    }),
    'object.min': ({ context }) => ({
      code: 'minimum',
      message: `should have at least ${context.limit} properties`,
      context: {
        value: context.limit,
      },
    }),
    'object.max': ({ context }) => ({
      code: 'maximum',
      message: `should have at most ${context.limit} properties`,
      context: {
        value: context.limit,
      },
    }),
    'object.oxor': ({ context }) => ({
      code: 'exclusive',
      message: `${join(context.peers, ', ')} cannot coexist`,
    }),
    'object.missing': () => ({
      code: 'required',
      message: `${join(context.peers, ', ')} at least one is required`,
    }),
    'array.hasUnknown': () => ({
      code: 'invalid',
      message: `does not contain a valid value`,
    }),
    'number.unsafe': () => ({
      code: 'invalid',
      message: `is an invalid number`,
    }),
  }

  const formatter = get(errors, [type])
  if (!formatter) {
    throw Error(`untreated validation error for ${type}`)
  }
  return formatter({ context })
}

function mapError ({ context, path, type }) {
  const error = { path, ...joiErrorMap({ context, type }) }

  if (!error.message) {
    error.message = `must be ${error.code}`
    if (!error.code) {
      error.message = ''
    }
  }

  return omitBy({
    code: error.code || 'undefined',
    message: trim(`${mapPath(error.path)} ${error.message}`),
    path: error.path,
    context: error.context,
  }, isNil)
}

module.exports = (error) => {
  if (!error.isJoi) {
    throw error
  }

  return error.details.map(mapError)
}
