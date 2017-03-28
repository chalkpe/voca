import Router from 'koa-router';
const router = new Router({ prefix: '/exam' });

router.get('/', async (ctx, next) => {
    ctx.body = 'World';
});

export default router;
