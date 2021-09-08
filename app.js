/**
 * cucumbery-web
 * 
 * (c) 2021 Wany
 * 
 * @summary cucumbery plugin website
 * @author Wany <sung@wany.io>
*/

const express = require('express');
const expressSession = require('express-session');
const expressMySQLSession = require('express-mysql-session');
const expressMySQLStore = expressMySQLSession(expressSession);
const fs = require('fs');
const tls = require('tls');
const cookieParser = require('cookie-parser');

const config = require('./config.json');

/* default setting */
const app = express();
const host = config.host;
const path = config.path;
const cert = tls.createSecureContext({
  key: fs.readFileSync('/etc/letsencrypt/live/cucumbery.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cucumbery.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/cucumbery.com/chain.pem'),
}).context;

const accounts = require('./modules/accounts');
const database = require('./modules/database');
const log = require('./modules/log');

/* post request setting */
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* session setting */
const sessionStore = new expressMySQLStore({
  host: database.config.host,
  port: database.config.port,
  user: database.config.user,
  password: database.config.password,
  database: database.config.database
});
const sessionParser = expressSession({
  name: config.session.name,
  secret: config.session.sessionSecret,
  store: sessionStore,
  resave: true,
  saveUninitialized: false,
  rolling: false,
  cookie: {
    domain: '.cucumbery.com',
    path: '/',
    secure: true,
    httpOnly: false,
    sameSite: 'strict',
  },
  unset: 'destroy'
});
app.set('trust proxy', 1);
app.use(cookieParser(config.session.cookieSecret));
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
  if (!referer || (referer && referer.match(/^https:\/\/(.+\.)?cucumbery\.com/i))) {
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
  if (host == req.headers.host || althosts.includes(req.headers.host)) {
    if (req.secure && host == req.headers.host) {
      next();
    }
    else {
      res.redirect('https://' + host + req.originalUrl);
      return;
    }
  }
  return;
});

/* header */
app.all('*', (req, res, next) => {
  const acceptedOrigin = [
    "https://cucumbery.com",
    "https://www.cucumbery.com",
    "https://wany.io",
    "https://api.wany.io"
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
  res.header('Server', 'wanyne server');
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
app.set('views', path + '/views');
// set basedir
app.locals.basedir = path;
// set router
app.use('/', require(path + '/routes/root'));
// set static resource files
app.use('/resource', express.static(path + '/resource'));
// set static files
app.use(express.static(path + '/public'));
// set 404
app.all('*', (req, res) => { 
  res.status(404).send("Not found");
});



exports.app = app;
exports.host = host;
exports.cert = cert;

exports.sessionStore = sessionStore;
exports.sessionParser = sessionParser;