import axios from 'axios'
import crc32 from 'crc-32'
import sha256 from 'sha256'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import * as config from '../config'

function error (message) {
  const err = new Error(message)
  message.response = { data: { message } }
  return err
}

const auth = {
  username: config.DIMIGO_API_ID,
  password: config.DIMIGO_API_PW
}

const uri = {
  auth: () => `${config.DIMIGO_API_HOST}/users/identify`,
  student: (username) => `${config.DIMIGO_API_HOST}/user-students/${username}`
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
  const params = { username, password: this.hash(password) }
  const { data: userData } = await axios.get(uri.auth(), { auth, params })
  const { id, name, sso_token: token, user_type: userType } = userData

  if (userType !== 'S') throw error('For students only')
  let user = await this.findOne({ username })

  if (!user) {
    const { data } = await axios.get(uri.student(username), { auth })
    user = new this({ id, username, token, name, serial: data.serial })

    await user.save()
  }

  user.token = token
  await user.save()

  return await jwt.sign({ username, serial: user.serial }, config.JWT_SECRET)
}

export default mongoose.model('User', schema)
