const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();

router.use(bodyParser());
router.get('/sign-up', async ctx => {
    ctx.render('index')
});

module.exports = router;
