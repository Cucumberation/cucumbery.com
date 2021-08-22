/**
 * cucumbery-web
 * 
 * (c) 2021 Wnynya
 * 
 * @summary cucumbery plugin website
 * @author Wany <wnynya@gmail.com>
 */

const express = require('express');

const fs = require('fs');
const tls = require('tls');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

const database = require('./modules/database.js');
const accounts = require('./modules/accounts.js');
const log = require('./modules/log.js');

/* global var */
global.cucumbery = new Object();
global.cucumbery.path = '/root/com.cucumbery';
global.cucumbery.dataPath = '/root/cucumbery-data';

/* default setting */
const app = express();
const host = 'cucumbery.com';
const althosts = ["cucumbery.wnynya.com", "cucumbery.wany.io"];
const cert = tls.createSecureContext({
  key: fs.readFileSync('/etc/letsencrypt/live/cucumbery.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cucumbery.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/cucumbery.com/chain.pem'),
}).context;

/* post request setting */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* session setting */
const cookieSecret = 'OYEEEEEEEEINGATSALAMAIKUM';
const sessionSecret = 'FOOBARCAKEBOMBER';
const sessionStore = new MySQLStore({
  host: database.config.host,
  port: database.config.port,
  user: database.config.user,
  password: database.config.password,
  database: database.config.database
});
const sessionParser = session({
  name: 'cucumbery.session',
  secret: sessionSecret,
  store: sessionStore,
  resave: true,
  saveUninitialized: false,
  rolling: false,
  cookie: {
    domain: '.cucumbery.com',
    path: '/',
    secure: true,
    httpOnly: false,
    expires: false,
    sameSite: "strict",
    maxAge: null,
  },
  unset: 'destroy'
});

app.cookieParser = cookieParser(cookieSecret);
app.use(app.cookieParser);
app.set('trust proxy', 1);
app.use(sessionParser);

/* log */
app.all('*', (req, res, next) => {
  log.req(req);
  next();
});

/* redirect outside referer */
app.all('*', (req, res, next) => {
  if (req.headers['sec-fetch-dest'] != "document") {
    next();
    return;
  }
  var referer = req.headers['referer'];
  if (!referer || (referer && referer.startsWith("https://cucumbery.com"))) {
    next();
    return;
  }
  else {
    res.render("master/redirect", {
      target: 'https://' + host + req.originalUrl
    });
    return;
  }
});

/* http redirect https */
app.all('*', (req, res, next) => {
  if (req.headers.host == host || althosts.includes(req.headers.host)) {
    if (!req.socket.encrypted) {
      res.redirect('https://' + host + req.originalUrl);
      return;
    }
    else if (req.headers.host != host) {
      res.redirect('https://' + host + req.originalUrl);
      return;
    }
    else {
      next();
    }
  }
  return;
});

/* header */
app.all('*', (req, res, next) => {
  const acceptedOrigin = [
    "https://cucumbery.com",
    "https://wany.io",
    "https://cherry.wany.io"
  ];
  if (acceptedOrigin.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  else {
    res.header('Access-Control-Allow-Origin', null);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('X-Frame-Options', 'sameorigin');
  res.header('Server', 'cucumbery server');
  res.header('X-Powered-By', 'cherry bomb');
  res.header('X-hacker', 'hello :)');
  next();
});

/* session update */
app.all('*', (req, res, next) => {
  if (req.session && req.session.account) {
    accounts.update(req).then(() => {
      next();
    }).catch(error => {
      next();
    });
  }
  else {
    next();
  }
});

// set view
app.set('view engine', 'pug');
app.set('views', global.cucumbery.path + '/views');
// set basedir
app.locals.basedir = global.cucumbery.path;
// set router
app.use('/', require('./routes/root'));
// set static resource files
app.use('/resource', express.static(global.cucumbery.path + '/resource'));
// set static files
app.use(express.static(global.cucumbery.path + '/public'));
// set 404
app.all('*', (req, res) => { res.status(404).send('Not Found'); });

exports.app = app;
exports.host = host;
exports.cert = cert;

exports.sessionStore = sessionStore;
exports.sessionParser = sessionParser;
exports.sessionSecret = sessionSecret;
exports.cookieSecret = cookieSecret;