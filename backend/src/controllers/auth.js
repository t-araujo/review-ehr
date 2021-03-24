const Bcrypt = require('bcrypt')
const HttpError = require('standard-http-error')
const JsonWebToken = require('jsonwebtoken')
const { Users } = require('src/models')

const token_secret = process.env.JWT_SECRET

class AuthController {
  static async login (email, password) {
    const user = await Users.findOne({ email }).exec()

    if (!user) {
      throw new HttpError(404, 'User not found')
    }

    const match = await Bcrypt.compare(password, user.password)

    if (!match) {
      throw new HttpError(400, 'User password not match')
    }

    const token = JsonWebToken.sign({ user: user.email, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, token_secret)

    return {
      ...user.toClient(),
      token,
    }
  }
}

module.exports = AuthController
