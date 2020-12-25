var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var app = express();

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var productRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var commentsRouter = require('./routes/comments');
var categoriesRouter = require('./routes/categories');
var ordersRouter = require('./routes/orders');
var ordersdetailsRouter = require('./routes/orderdetails');

app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);
app.use('/api/news', newsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/ordersdetails', ordersdetailsRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
