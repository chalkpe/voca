const Boom = require('boom')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const { output, isServer } = Boom.wrap(err, err.statusCode)

    if (isServer) ctx.app.emit('error', err, ctx);
    [ctx.body, ctx.status] = [output.payload, output.statusCode]
  }
}
