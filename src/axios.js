import axios from 'axios'
import * as config from './config'

const auth = {
  username: config.DIMIGO_API_ID,
  password: config.DIMIGO_API_PW
}

export default new Proxy({}, {
  get: (target, prop) => async (url, config = {}) => {
    try {
      return await axios[prop](url, { auth, ...config })
    } catch (err) {
      let error = new Error(err.response.data.message)
      error.status = 401

      throw error
    }
  }
})
