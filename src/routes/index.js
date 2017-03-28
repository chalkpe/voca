import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';

import rootRouter from './root';
import authRouter from './auth';
import examRouter from './exam';

const routes = [
    rootRouter,
    authRouter,
    examRouter,
];

export default () => {
    let middlewares = routes.map(r => [r.routes(), r.allowedMethods()]);
    return compose([bodyParser()].concat(...middlewares));
}
