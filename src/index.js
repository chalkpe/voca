import Koa from 'koa';
import routes from './routes';
import logger from '../util/logger';

const app = new Koa();

routes.forEach(router => app
    .use(router.routes())
    .use(router.allowedMethods()));

await app
    .use(logger());
    .listen(8888);

console.log('Server started!');
