import crc32 from 'crc-32'
import sha256 from 'sha256'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import axios from '../axios'
import * as config from '../config'

function error (message) {
  let err = new Error(message)
  err.status = 401

  return err
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
  if (!username) throw error('username is undefined')
  if (!password) throw error('password is undefined')

  const params = { username, password: this.hash(password) }
  const { data: userData } = await axios.get(uri.auth(), { params })
  const { id, name, sso_token: token, user_type: userType } = userData

  if (userType !== 'S') throw error('not a student')
  let user = await this.findOne({ username })

  if (!user) {
    const { data } = await axios.get(uri.student(username))
    user = new this({ id, username, token, name, serial: data.serial })

    await user.save()
  }

  user.token = token
  await user.save()

  return await jwt.sign({ username, serial: user.serial }, config.JWT_SECRET)
}

export default mongoose.model('User', schema)
