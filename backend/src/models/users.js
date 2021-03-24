const Bcrypt = require('bcrypt')
const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.method('toClient', function () {
  const obj = this.toObject()
  const new_obj = {}

  new_obj.id = obj._id
  new_obj.email = obj.email
  new_obj.name = obj.name
  new_obj.title = obj.title

  return new_obj
})

userSchema.pre('save', async function (next) {
  const oldPass = this.password
  this.password = await Bcrypt.hash(oldPass, 10)

  next()
})

Mongoose.model('Users', userSchema)

module.exports = Mongoose.model('Users')
