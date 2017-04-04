import Router from 'koa-router'
import User from '../models/User'

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
  try {
    ctx.body = await User.authenticate(ctx.request.body)
  } catch (err) {
    ctx.throw(401, err.message)
  }
})

export default router
