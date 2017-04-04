import axios from 'axios'
import crc32 from 'crc-32'
import sha256 from 'sha256'
import mongoose from 'mongoose'

import * as config from '../config'

const auth = {
  username: config.DIMIGO_API_ID,
  password: config.DIMIGO_API_PW
}

const uri = {
  auth: config.DIMIGO_API_HOST + '/users/identify'
}

const schema = mongoose.Schema({
  username: { type: String, unique: true },

  token: String,
  name: String,
  email: String
})

schema.statics.hash = (password) => {
  const hash = crc32.str(password) >>> 0 // convert to uint32
  const padded = `0000000000${hash}`.slice(-10) // sprintf("%010s", str)

  return '@' + sha256(password + padded)
}

schema.statics.authenticate = async function ({ username, password }) {
  const { data } = await axios.get(uri.auth, {
    auth, params: { username, password: this.hash(password) }
  })

  return data
}

export default mongoose.model('User', schema)
