const express = require('express');
const morgan = require('morgan');
const urlRouter = require(`${__dirname}/routes/url-route`);


// Creating Express App
const app = express();

// Serving static files (img, css, js)
app.use(express.static(`${__dirname}/public`));

// getting all request/response logs
app.use(morgan('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using pug as template engine
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`);


// using router for all routes
app.use('/', urlRouter);


module.exports = app;