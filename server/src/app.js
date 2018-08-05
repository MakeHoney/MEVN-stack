const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const db = require('./dbConnection');

const postsRouter = require('../api/posts/router');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postsRouter);

app.use((req, res, next) => { next(createError(404)); });

app.use((err, req, res, next) => {
  res.locals.message - err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
