import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import routes from './routes';
import logger from './logger';

const app = new Koa();
const port = process.env.PORT || 8888;

app
    .use(logger())
    .use(bodyParser())
    .use(routes());

app.listen(port, () => console.log(`Listening on port ${port}`));
