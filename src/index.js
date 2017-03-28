import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import routes from './routes';
import logger from './logger';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://localhost/voca')
    .catch(::console.error).then(startApp);

function startApp() {
    const app = new Koa();
    const port = process.env.PORT || 8888;

    app
        .use(logger())
        .use(bodyParser())
        .use(routes());
        
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
