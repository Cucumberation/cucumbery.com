/**
 * cucumbery-web
 * 
 * (c) 2021 Wnynya
 * 
 * @summary cucumbery plugin website
 * @author Wany <wnynya@gmail.com>
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
    "https://api.wany.io",
    "https://storage.wany.io",
    "https://protocol.wany.io",
    "https://cherry.wany.io",
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
const Message = require("./routes/message.json");
app.all('*', (req, res) => { res.status(404).send({ message: Message.default404 }); });



exports.app = app;
exports.host = host;
exports.cert = cert;

exports.sessionStore = sessionStore;
exports.sessionParser = sessionParser;