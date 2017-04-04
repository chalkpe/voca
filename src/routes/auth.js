import Router from 'koa-router'
import User from '../models/User'

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
  try {
    ctx.body = await User.authenticate(ctx.request.body)
  } catch (err) {
    if (!err.response) ctx.throw(500, err)
    else ctx.throw(401, err.response.data)
  }
})

export default router
