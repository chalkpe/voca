import Router from 'koa-router'
import Book from '../models/Book'

const router = new Router({ prefix: '/learn' })

router.get('/', async (ctx, next) => {
  ctx.body = await Book.find()
})

export default router
