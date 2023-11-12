const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// Set up view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/', routes);
app.use('/books', books);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  if (err.status === 404) {
    console.log('404 error - Page Not Found');
    res.status(404).render('page-not-found', { title: 'Page Not Found' });
  } else {
    console.log('500 error - Server Error');
    err.status = err.status || 500;
    res.status(err.status).render('error', { title: 'Server Error' });
  }
});

module.exports = app;
