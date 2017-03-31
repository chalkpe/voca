import compose from 'koa-compose'

import authRouter from './auth'
import examRouter from './exam'
import learnRouter from './learn'

const routes = [
  authRouter,
  examRouter,
  learnRouter
]

export default () => compose([].concat(
  ...routes.map(r => [r.routes(), r.allowedMethods()])
))
