import Koa from 'koa';

import routes from './routes';
import logger from './logger';

const app = new Koa();

app
    .use(logger())
    .use(routes())
    .listen(8888);
