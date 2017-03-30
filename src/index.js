import path from 'path'

import Koa from 'koa'
import etag from 'koa-etag'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import conditional from 'koa-conditional-get'

import routes from './routes'
import logger from './util/logger'

import mongoose from 'mongoose'
mongoose.Promise = global.Promise

mongoose
  .connect('mongodb://localhost/voca')
  .then(startApp).catch(::console.error)

function startApp () {
  console.log(`Connected to database ${mongoose.connection.name}`)

  const app = new Koa()
  const port = process.env.PORT || 8080
  const dist = path.join(__dirname, '..', 'dist')

  app
    .use(conditional())
    .use(etag())
    .use(bodyParser())
    .use(routes())
    .use(logger())
    .use(serve(dist, { maxage: 1000 * 60 * 30 }))

  app.listen(port, () => console.log(`Listening on port ${port}`))
}
