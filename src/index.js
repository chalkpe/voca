import Koa from 'koa';
import routes from './routes';

const app = new Koa();

routes(app);
app.listen(8888);
