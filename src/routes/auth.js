import Router from 'koa-router'
import User from '../models/User'

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) =>
  (ctx.body = await User.authenticate(ctx.request.body)))

export default router
