import path from 'path'

import Koa from 'koa'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'

import routes from './routes'
// import logger from './logger'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose
  .connect('mongodb://localhost/voca')
  .then(startApp).catch(::console.error)

function startApp () {
  const app = new Koa()
  const port = process.env.PORT || 8888

  app
    // .use(logger())
    .use(bodyParser())
    .use(routes())
    .use(serve(path.resolve(__dirname, '..')))

  app.listen(port, () => console.log(`Listening on port ${port}`))
}
