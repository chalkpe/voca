import chalk from 'chalk'
import moment from 'moment'

const colours = new Proxy(
  ['yellow', 'green', 'green', 'cyan', 'yellow', 'red'],
  { get: (target, name) => chalk[target[name]] || chalk.reset })

const method = ({ method }) => method
const url = ({ originalUrl }) => originalUrl
const remoteAddress = ({ request }) => request.ip
const duration = (start) => () => `- ${new Date() - start} ms`
const status = ({ status }) => colours[status / 100 | 0](status)
const time = () => moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
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
