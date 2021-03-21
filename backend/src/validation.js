const Joi = require('joi')

const defaultValidateOptions = {
  abortEarly: false,
  allowUnknown: true,
  convert: false,
  stripUnknown: true,
}

module.exports = {
  is: Joi,
  validate: async (value, schema, options = {}) => {
    return Joi.validate(value, schema, { ...defaultValidateOptions, ...options })
  },
}
