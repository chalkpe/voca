const chalk = require('chalk');
const moment = require('moment');
const morgan = require('morgan');

morgan.token('-date', () => moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'));
morgan.token('-status', (req, res, s = morgan.status(req, res)) =>  chalk[s >= 500 ? 'red' : s >= 400 ? 'yellow' : s >= 300 ? 'cyan' : s >= 200 ? 'green' : 'reset'](s));

const logger = morgan(':-date :method HTTP/:http-version :-status :remote-addr :remote-user :url - :response-time ms');
module.exports = () => (ctx, next) => new Promise((resolve, reject) => logger(ctx.req, ctx.res, err => err ? reject(err) : resolve(ctx))).then(next);
