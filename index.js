#!/usr/bin/env node

const Koa = require('koa');

const app = new Koa();
const router = require('./app/router');
const logger = require('./util/logger');

app
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);
