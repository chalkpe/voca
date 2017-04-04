import axios from 'axios'
import crc32 from 'crc-32'
import sha256 from 'sha256'

import Router from 'koa-router'
import * as config from '../config'

const auth = {
  username: config.DIMIGO_API_ID,
  password: config.DIMIGO_API_PW
}

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
  const { username, password } = ctx.request.body
  const uri = config.DIMIGO_API_HOST + '/v1/users/identify'

  const crc = '0000000000' + (crc32.str(password) >>> 0)
  const hash = '@' + sha256(password + crc.substr(-10, 10))

  try {
    const { data } = await axios.get(uri, {
      auth, params: { username, password: hash }
    })

    ctx.body = data
    // TODO: session data (JWT)
  } catch ({ response: { data } }) {
    ctx.throw(data.status || 401, data)
  }
})

export default router
