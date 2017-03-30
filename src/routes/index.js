import compose from 'koa-compose'

import authRouter from './auth'
import examRouter from './exam'

const routes = [
  authRouter,
  examRouter
]

export default () => compose([].concat(
  ...routes.map(r => [r.routes(), r.allowedMethods()])
))
