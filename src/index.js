import path from 'path'

import Koa from 'koa'
import etag from 'koa-etag'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import conditional from 'koa-conditional-get'
import logger from 'koa-chalk-logger'

import boom from './boom'
import routes from './routes'
import * as config from '../config'

import mongoose from 'mongoose'
mongoose.Promise = global.Promise

mongoose
  .connect(config.MONGODB_URI)
  .then(startApp).catch(::console.error)

function startApp () {
  console.log(`Connected to database ${mongoose.connection.name}`)

  const app = new Koa()
  const port = process.env.PORT || config.PORT
  const dist = path.join(__dirname, '..', ...config.DIST_PATH)

  app
    .use(logger())
    .use(conditional())
    .use(etag())
    .use(bodyParser())
    .use(boom())
    .use(routes())
    .use(serve(dist, { maxage: 1000 * 60 * 30 }))

  app.listen(port, () => console.log(`Listening on port ${port}`))
}
