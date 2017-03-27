import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const router = new Router({ prefix: '/auth' })
    .use(bodyParser())
    .get('/', async (ctx, next) => {
        ctx.body = 'Hello'
    });

export default router;
