#!/usr/bin/env node

const Koa = require('koa');
const Pug = require('koa-pug')

const app = new Koa();
const router = require('./router');
const logger = require('../../util/logger');

new Pug({
    app: app,
    viewPath: './views'
});

app
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);
