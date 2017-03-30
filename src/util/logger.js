import chalk from 'chalk'
import moment from 'moment'

const colours = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow'
}

const method = ({ method }) => method
const url = ({ originalUrl }) => originalUrl
const remoteAddress = ({ request }) => request.ip
const duration = (start) => () => `- ${new Date() - start} ms`
const time = () => moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
const status = ({ status }) => chalk[colours[status / 100 | 0] || 'reset'](status)
const httpVersion = ({ req }) => `HTTP/${req.httpVersionMajor}.${req.httpVersionMinor}`

function log (ctx, start) {
  const tokens = [
    time,
    method,
    httpVersion,
    status,
    remoteAddress,
    url,
    duration(start)
  ]

  console.log(tokens.map(x => x(ctx)).join(' '))
}

export default () => async (ctx, next) => {
  const start = new Date()
  await next()

  ctx.res
    .once('close', () => log(ctx, start))
    .once('finish', () => log(ctx, start))
}
