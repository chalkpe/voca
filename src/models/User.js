import Dimigo from 'dimigo'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import * as config from '../../config'
import * as secret from '../../config/secret'

const dimigo = new Dimigo({
  host: config.DIMIGO_API_HOST,
  username: secret.DIMIGO_API_ID,
  password: secret.DIMIGO_API_PW
})

const schema = mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, unique: true },

  name: String,
  serial: String
})

const TheError = (message, statusCode = 400) => {
  const error = new Error(message)
  error.statusCode = statusCode

  return error
}

schema.statics.authenticate = async function ({ username, password }) {
  if (!username) throw TheError('username field is required', 400)
  if (!password) throw TheError('password field is required', 400)

  const { id, name, userType } = await dimigo.identifyUser(username, password)

  if (userType !== 'S') throw TheError('not a student', 401)
  let user = await this.findOne({ id, username })

  if (!user) {
    const { serial } = await dimigo.getStudent(username)
    user = new this({ id, username, name, serial })
  }

  await user.save()
  return await jwt.sign({ username, serial: user.serial }, secret.JWT_SECRET)
}

export default mongoose.model('User', schema)
