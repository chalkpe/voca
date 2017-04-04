import Router from 'koa-router'
import User from '../models/User'

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
  try {
    ctx.body = await User.authenticate(ctx.request.body)
  } catch (err) {
    ctx.throw(err.status, err.message)
  }
})

export default router
