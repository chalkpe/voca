import axios from 'axios'
import crc32 from 'crc-32'
import sha256 from 'sha256'
import sprintf from 'sprintf'

import Router from 'koa-router'
import * as config from '../config'

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx, next) => {
  const { username, password } = ctx.request.body

  const c = sprintf('%010u', crc32.str(password)) // TODO: PHP crc32() Compatibility
  const hash = '@' + sha256(password + c)

  const url = config.DIMIGO_API_HOST + '/v1/users/identify'
  console.log(url, c, hash)

  try {
    const { data } = await axios.get(url, {
      params: { username, password },
      auth: { username: config.DIMIGO_API_ID, password: config.DIMIGO_API_PW }
    })
    ctx.body = data
  } catch (e) {
    ctx.body = e.response.data
  }
})

export default router
