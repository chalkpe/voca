import Router from 'koa-router'

import Day from '../models/Day'
import Book from '../models/Book'

const router = new Router({ prefix: '/learn' })

router.get('/', async (ctx, next) =>
  (ctx.body = await Book.find().sort('id')))

router.get('/:book', async (ctx, next) =>
  (ctx.body = await Book.findOne({ id: ctx.params.book })))

router.get('/:book/:day', async (ctx, next) =>
  (ctx.body = await Day.findOne({ book: ctx.params.book, id: ctx.params.day })))

export default router
