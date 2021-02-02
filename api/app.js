const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');

const { express: config } = require('./config');
const middlewares = require('./middlewares');
const indexRouter = require('./routes');

const app = express();

/* Database*/
require('./mongoose')

/* Middlewares */
app.use(cors({ maxAge: config.maxAge }));
app.use(helmet());
app.use(express.json());
app.use(middlewares.timeout);

/* Routers */
app.use('/', indexRouter);
app.use(middlewares.notFound);

/* Handlers */
app.use(middlewares.error);

module.exports = app;