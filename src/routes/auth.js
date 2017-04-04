import axios from 'axios'
import Router from 'koa-router'

import hash from '../util/hash'
import * as config from '../config'

const auth = {
  username: config.DIMIGO_API_ID,
  password: config.DIMIGO_API_PW
}

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
  const { username, password } = ctx.request.body
  const uri = config.DIMIGO_API_HOST + '/users/identify'

  try {
    const { data } = await axios.get(uri, {
      auth, params: { username, password: hash(password) }
    })

    ctx.body = data
    // TODO: session data (JWT)
  } catch ({ response: { data } }) {
    ctx.throw(data.status || 401, data)
  }
})

export default router
