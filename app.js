var express = require('express');
var app = express();

var http = require('http');
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var config = require('./src/config');
const controller = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'descrify',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(controller);

var err404 = require('./err/404');
var err = require('./err/err');
app.use(err404);
app.use(err);

var initPassport = require('./src/init/passport');
initPassport(passport);

var initDatabase = require('./src/init/database');
initDatabase(config);

module.exports = app;
