import Router from 'koa-router'
import User from '../models/User'

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
  const { username, password } = ctx.request.body

  try {
    const data = await User.authenticate({ username, password })
    ctx.body = data
  } catch ({ response: { data } }) {
    ctx.throw(data.status || 401, data)
  }
})

export default router
