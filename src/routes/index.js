import logger from '../logger';
import bodyParser from 'koa-bodyparser';

import rootRouter from './root';
import authRouter from './auth';
import examRouter from './exam';

const routes = [
    rootRouter,
    authRouter,
    examRouter,
];

export default function router(app) {
    routes.forEach(router => app
        .use(logger())
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods()));
}
