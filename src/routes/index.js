import compose from 'koa-compose'

import rootRouter from './root'
import authRouter from './auth'
import examRouter from './exam'

const routes = [
  rootRouter,
  authRouter,
  examRouter
]

export default () => compose([].concat(
  ...routes.map(r => [r.routes(), r.allowedMethods()])
))
