import chalk from 'chalk'
import moment from 'moment'
import morgan from 'morgan'

const colours = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow'
}

morgan.token('-date', () => moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'))
morgan.token('-status', (req, res) => {
  const status = morgan.status(req, res)
  return chalk[colours[status / 100 | 0] || 'reset'](status)
})

const logger = morgan(':-date :method HTTP/:http-version :-status :remote-addr :remote-user :url - :response-time ms')
export default () => (ctx, next) => logger(ctx.req, ctx.res, next)

// FIXME: Doesn't work with koa-send
