import crc32 from 'crc-32'
import sha256 from 'sha256'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import axios from 'axios'
import * as config from '../../config'
import * as secret from '../../config/secret'

const auth = {
  username: secret.DIMIGO_API_ID,
  password: secret.DIMIGO_API_PW
}

const uri = {
  auth: () => `${config.DIMIGO_API_HOST}/users/identify`,
  student: (username) => `${config.DIMIGO_API_HOST}/user-students/${username}`
}

async function fetch (url, params = {}) {
  try {
    // HTTP basic authentication
    return await axios.get(url, { auth, params })
  } catch (err) {
    let { message } = err.response ? err.response.data : err
    throw new Error(message) // set proper error message and rethrow
  }
}

const schema = mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, unique: true },

  token: String,
  name: String,
  serial: String
})

schema.statics.hash = (password) => {
  const hash = crc32.str(password) >>> 0 // convert to uint32
  const padded = `0000000000${hash}`.slice(-10) // sprintf("%010s", str)

  return '@' + sha256(password + padded)
}

schema.statics.authenticate = async function ({ username, password }) {
  if (!username) throw new Error('username is undefined')
  if (!password) throw new Error('password is undefined')

  const params = { username, password: this.hash(password) }
  const { data: userData } = await fetch(uri.auth(), params)
  const { id, name, sso_token: token, user_type: userType } = userData

  if (userType !== 'S') throw new Error('not a student')
  let user = await this.findOne({ username })

  if (!user) {
    const { data } = await fetch(uri.student(username))
    user = new this({ id, username, token, name, serial: data.serial })

    await user.save()
  }

  user.token = token
  await user.save()

  return await jwt.sign({ username, serial: user.serial }, secret.JWT_SECRET)
}

export default mongoose.model('User', schema)
