import combineRouters from 'koa-combine-routers';
import authRouter from './auth';

const router = combineRouters([
    authRouter
])

export default router;
