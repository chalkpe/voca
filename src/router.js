const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

module.exports = new Router().use(bodyParser());
