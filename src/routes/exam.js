import Router from 'koa-router'

import Day from '../models/Day'

const router = new Router({ prefix: '/exam' })

router.get('/:book/:day', async (ctx, next) =>
  (ctx.body = await Day.aggregate(
    { $match: { book: ctx.params.book, id: parseInt(ctx.params.day) } },
    { $unwind: '$words' },
    { $sample: { size: 10 } },
    { $group: { _id: '$_id', problems: { $push: '$words' } } }
  )))

export default router
