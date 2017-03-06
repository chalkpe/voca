const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();

router.use(bodyParser());
router.post('/sign-up', async ctx => {
    
});

module.exports = router;
