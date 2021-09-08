/**
 * log.js
 * 
 * (c) 2020-2021 Wany
 *
 * @summary logger / log
 * @author Wany <sung@wany.io>
*/

const config = require('../config.json');

const fs = require('fs');
const time = require('./time');
const knownHosts = require('./known-hosts.json');
const knownReferers = require('./known-referers.json');

class Logger {

  constructor (data) {
    this.source = data.source;
    this.title = data.title;
    this.color = data.color;
    this.dir = data.dir;
    this.type = data.type;
    this.channel = data.channel;
  }

  log (message, type, silent) {

    if (!silent) {
      let consoleMessage = "\x1b[0m\x1b[90m[\x1b[0m" + this.color + this.title + "\x1b[0m ";
      consoleMessage += time.stamp("log") + "\x1b[0m\x1b[90m]\x1b[0m: ";
      consoleMessage += this.type[type].console;
      if (message.stack) { 
        consoleMessage += message.stack + "\x1b[0m"; 
      } 
      else { 
        consoleMessage += message + "\x1b[0m"; 
      }
      console.log(consoleMessage);
    }

    if (typeof msg == "string") {
      msg = msg.replace(/\x1b\[(.*)m/gi, "");
    }

    let filename = this.channel + "-" + time.datetime("YYYYMMDD") + "-" + this.source;
    if (type == "error") { 
      filename += "-error" 
    }
    filename += ".log";

    let dir = this.dir + "/" + time.datetime("YYYYMM");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let file = dir + "/" + filename;

    let logMessage = "[" + this.title + "]" + this.type[type].text + time.stamp("logm");
    if (message.stack) { 
      logMessage += message.stack; 
    } 
    else { 
      logMessage += message; 
    }
    logMessage += "\r\n";
    fs.appendFileSync(file, logMessage);

  }

}

const logger = new Logger({
  channel: "log",
  source: config.logger.source,
  title: config.logger.title,
  color: "\u001B[38;2;" + config.logger.color.red + ";" + config.logger.color.green + ";" + config.logger.color.blue + "m",
  dir: config.path + "/data/logs",
  type: {
    info: {
      console: "",
      text: "[INFO]"
    },
    warn: {
      console: "\u001B[43m\u001B[30m[WARN]\u001B[0m\u001B[93m ",
      text: "[WARN]"
    },
    error: {
      console: "\u001B[41m\u001B[30m[ERROR]\u001B[0m\u001B[91m ",
      text: "[EROR]"
    },
    debug: {
      console: "\u001B[45m\u001B[30m[DEBUG]\u001B[0m\u001B[95m ",
      text: "[DEBG]"
    }
  }
});

exports.info = (message) => { logger.log(message, "info", false); }
exports.warn = (message) => { logger.log(message, "warn", false); }
exports.error = (message) => { logger.log(message, "error", false); }
exports.debug = (message) => { logger.log(message, "debug", false); }

exports.only = (message) => { logger.log(message, "info", true); }
exports.onlyWarn = (message) => { logger.log(message, "warn", true); }
exports.onlyError = (message) => { logger.log(message, "error", true); }
exports.onlyDebug = (message) => { logger.log(message, "debug", true); }

const reqLogger = new Logger({
  channel: "req",
  source: config.logger.source,
  title: config.logger.title,
  color: "\u001B[38;2;" + config.logger.color.red + ";" + config.logger.color.green + ";" + config.logger.color.blue + "m",
  dir: config.path + "/data/logs",
  type: {
    info: {
      console: "",
      text: "[INFO]"
    },
    warn: {
      console: "\u001B[43m\u001B[30m[WARN]\u001B[0m\u001B[93m ",
      text: "[WARN]"
    },
    error: {
      console: "\u001B[41m\u001B[30m[ERROR]\u001B[0m\u001B[91m ",
      text: "[EROR]"
    },
    debug: {
      console: "\u001B[45m\u001B[30m[DEBUG]\u001B[0m\u001B[95m ",
      text: "[DEBG]"
    }
  }
});

function getClientNavigator(ua) {

  var browser;
  var system;

  if(!ua) {
    system = "Unknown";
    browser = "Unknown";  
  }
  else {
    if (ua.indexOf("Windows") > -1) {
      system = "Windows";
      if (/(Windows 10.0|Windows NT 10.0)/.test(ua)) {
        system = "Windows 10";
      }
      else if (/(Windows 8.1|Windows NT 6.3)/.test(ua)) {
        system = "Windows 8.1";
      }
      else if (/(Windows 8|Windows NT 6.2)/.test(ua)) {
        system = "Windows 8";
      }
      else if (/(Windows 7|Windows NT 6.1)/.test(ua)) {
        system = "Windows 7";
      }
      else if (/Windows NT 6.0/.test(ua)) {
        system = "Windows Vista";
      }
      else if (/(Windows NT 5.1|Windows XP)/.test(ua)) {
        system = "Windows XP";
      }
    }
    else if (ua.indexOf("Macintosh") > -1) {
      system = "Mac";
    }
    else if (ua.indexOf("iPhone") > -1) {
      system = "iPhone";
    }
    else if (ua.indexOf("iPad") > -1) {
      system = "iPad";
    }
    else if (ua.indexOf("iPad") > -1) {
      system = "iPod";
    }
    else if (ua.indexOf("Android") > -1) {
      system = "Android";
    }
    else if (ua.indexOf("Linux") > -1) {
      system = "Linux";
    }
    else if (ua.indexOf("X11") > -1) {
      system = "Unix";
    }
    else {
      system = "Unknown";
    }
  
    if (ua.indexOf("Firefox") > -1) {
      browser = "Firefox";
    } 
    else if (ua.toLowerCase().indexOf("bot") > -1) {
      browser = "Bot";
    } 
    else if (ua.indexOf("Steam") > -1) {
      browser = "Steam";
    } 
    else if (ua.indexOf("Instagram") > -1) {
      browser = "Instagram";
    } 
    else if (ua.indexOf("KAKAOTALK") > -1 || ua.indexOf("kakaotalk-scrap") > -1) {
      browser = "Kakaotalk";
    } 
    else if (ua.indexOf("NAVER(inapp") > -1) {
      browser = "Naver App";
    } 
    else if (ua.indexOf("SamsungBrowser") > -1) {
      browser = "Samsung Internet";
    } 
    else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
      browser = "Opera";
    } 
    else if (ua.indexOf("Trident") > -1) {
      browser = "IE";
    } 
    else if (ua.indexOf("Edg") > -1) {
      browser = "Edge";
    } 
    else if (ua.indexOf("Whale") > -1) {
      browser = "Whale";
    } 
    else if (ua.indexOf("Chrome") > -1) {
      browser = "Chrome";
    } 
    else if (ua.indexOf("Safari") > -1) {
      browser = "Safari";
    } 
    else {
      browser = "Unknown";
    }
  }

  var data = {
    browser: browser,
    system: system
  };

  return data;

}

const ignoreHosts = config.logger["ignore-hosts"];
const ignoreAgents = config.logger["ignore-agents"];

exports.req = (req) => {

  var message = "";

  // ip
  var ips = "";
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") { ip = ip.substr(7); }
  if (ignoreHosts.includes(ip)) { 
    return; 
  }
  ips = ip;
  /*var geoipData = geoip.query(ip);
  if (geoipData && geoipData.country) {
    ips = ips + "/" + (geoipData.country + "").toUpperCase();
  }*/
  if (knownHosts.hasOwnProperty(ip)) { 
    ips = knownHosts[ip] + " (" + ips + ")"; 
  }

  // protocol
  let protocol = '';
  if (req.socket.encrypted) { protocol = 'HTTPS'; }
  else { protocol = 'HTTP'; }

  // method
  let method = req.method;

  // path
  let path = req.originalUrl;

  message += ips + ' => ' + protocol + ' ' + method + ' ' + path;

  // client Data
  var clientData = new Object();

  var referer = req.header('Referer');
  if (!referer) {
    clientData.referer = "Direct";
  }
  else {
    for (var key in knownReferers) {
      if (referer.startsWith(key)) {
        clientData.referer = knownReferers[key] + " (" + referer + ")";
        break;
      }
    }
    if (!clientData.referer) {
      clientData.referer = referer;
    }
  }

  var agent = req.headers['user-agent'];

  if (ignoreAgents.includes(agent)) {
    return;
  }
  
  var acd = getClientNavigator(agent);

  clientData.system = acd.system;
  clientData.browser = acd.browser;
  clientData.agent = agent;
  

  if (req.session && req.session.account && req.session.account.login == true) {
    let account;
    account = req.session.account;
    clientData.account = {
      id: account.id,
      name: account.name,
    }
    clientData.sessionID = req.sessionID;
  }

  // doc type
  let documentType = req.headers['sec-fetch-dest'];

  let cookies = req.cookies;
  try {
    cookies = JSON.stringify(cookies);
  } catch (error) { }

  message += " => " + JSON.stringify(clientData);
  message += " " + documentType;

  reqLogger.log(message, "info", true);
}