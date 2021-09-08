/**
 * accounts.js
 * 
 * (c) 2020-2021 Wany
 * 
 * @summary account login / logout / modify
 * @author Wany <sung@wany.io>
 */

 const database = require('./database.js');
 const time = require('./time.js');
 const crypto = require('crypto');
 const table = exports.table = "accounts";
 
 const encode = database.encode;
 const decode = database.decode;
 const trim = database.trim;
 
 /**
  * @desc Hash key
  * @param {string} key
  * @param {string} salt
  * @returns {string} Hash
  */
 function getHash(key, salt) {
   return new Promise((resolve, reject) => {
     var source = crypto.createHmac('sha512', salt.toString());
     source.update(key);
     var hash = source.digest('hex');
     resolve(hash);
   });
 }
 
 function randomString(size) {
   var result = '';
   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   for (var i = 0; i < size; i++) {
     result += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return result;
 }
 
 /**
  * @name Account
  */
 class Account {
 
   constructor(id) {
     this.id = trim(encode(id));
 
     this.permissions = [];
     this.name = null;
     this.email = null;
     this.phone = null;
 
     this.sessions = [];
   }
 
   /**
    * @async
    * @function pull
    * @desc Get account data from database
    */
   pull() {
     return new Promise((resolve, reject) => {
 
       let query = "SELECT * FROM " + table + " WHERE id = \'" + encode(this.id) + "\'";
 
       database.query(query).then(res => {
         if (res.length == 0) {
           reject(null);
         }
         var data = res[0];
 
         this.name = decode(data.name);
         this.email = decode(data.email);
         this.phone = decode(data.phone);
 
         var permissions = new Array();
         try {
           permissions = JSON.parse(data.perm);
         } catch (error) { }
         this.permissions = permissions;
 
         resolve();
       }).catch((error) => {
         reject(error);
       });
 
     });
   }
 
   /**
    * @async
    * @function push
    * @desc Update account data to database
    */
   push() {
     return new Promise((resolve, reject) => {
 
       let query = "UPDATE " + table + " SET ";
       query += "perm = '" + JSON.stringify(this.permissions) + "', ";
       query += "name = '" + trim(encode(this.name)) + "', ";
       query += "email = '" + trim(encode(this.email)) + "', ";
       query += "phone = '" + trim(encode(this.phone)) + "' ";
       query += "WHERE id = \'" + encode(this.id) + "\'";
 
       database.query(query).then(res => {
         return resolve();
       }).catch(error => {
         return reject(error);
       });
 
     });
   }
 
   /**
    * @async
    * @function insert
    * @desc Insert account data to database
    * @param {string} key
    */
   insert(key) {
     return new Promise((resolve, reject) => {
 
       getHash("sha512", this.id, new Date() + "").then(keysalt => {
         getHash("sha512", key, keysalt).then(keyhash => {
 
           let query = "INSERT INTO " + table + " (id, keyhash, keysalt, name, registerdate) VALUES (";
           query += "'" + encode(this.id) + "', ";
           query += "'" + keyhash + "', ";
           query += "'" + keysalt + "', ";
           query += "'" + trim(encode(this.name)) + "', ";
           query += "'" + time.datetime("YYYY-MM-DD hh:mm:ss", "now") + "'); ";
 
           database.query(query).then(() => {
             resolve();
           }).catch((error) => {
             reject(error);
           });
 
         });
       });
 
     });
   }
 
   /**
    * @async
    * @function verify
    * @desc Verify key is vaild
    * @param {string} key
    */
   verify(key) {
     return new Promise((resolve, reject) => {
 
       let query = "SELECT keyhash FROM " + table + " WHERE id = \'" + encode(this.id) + "\'";
 
       database.query(query).then(res => {
         if (res.length == 0) {
           reject(null);
         }
         var keyhash = res[0].keyhash;
 
         this.crypt(key).then(hash => {
           if (hash === keyhash) {
             resolve();
           }
           else {
             reject(false);
           }
         });
 
       }).catch((error) => {
         reject(error);
       });
 
     });
   }
 
   /**
    * @async
    * @function crypt
    * @desc Get hash from key with account unique key salt
    * @param {string} key
    * @returns {string} hash
    */
   crypt(key) {
     return new Promise((resolve, reject) => {
 
       const rand = Math.round(Math.random() * 1000) + 250;
       setTimeout(() => {
 
         let query = "SELECT keysalt FROM " + table + " WHERE id = \'" + encode(this.id) + "\'";
 
         database.query(query).then(res => {
           if (res.length == 0) {
             reject(null);
           }
           var salt = res[0].keysalt;
 
           getHash(key, salt).then(hash => {
             resolve(hash);
           });
 
         }).catch((error) => {
           reject(error);
         });
 
       }, rand);
 
     });
   }
 
   pushKeyHash(hash) {
     return new Promise((resolve, reject) => {
 
       let query = "UPDATE " + table + " SET ";
       query += "keyhash = '" + hash + "' ";
       query += "WHERE id = \'" + encode(this.id) + "\'";
 
       database.query(query).then(res => {
         return resolve();
       }).catch(error => {
         return reject(error);
       });
 
     });
   }
 
   pullSessions() {
     return new Promise((resolve, reject) => {
 
       let query = "SELECT sessions FROM " + table + " WHERE id = \'" + encode(this.id) + "\'";
 
       database.query(query).then(res => {
         if (res.length == 0) {
           reject({});
         }
         var data = res[0];
 
         this.sessions = new Array();
         var sessions = new Array();
         try {
           sessions = JSON.parse(data.sessions);
         } catch (error) { }
 
         var getSessions = [];
         for (var s of sessions) {
           getSessions.push(getSession(wanyneServer.sessionStore, s.id));
         }
         Promise.all(getSessions).then(sessionDatas => {
           for (var i = 0; i < sessionDatas.length; i++) {
             var session = new Session(sessions[i].id, sessionDatas[i], sessions[i].clientData);
             this.sessions.push(session);
           }
           resolve();
         }).catch((error) => {
           reject(error);
         });
       }).catch((error) => {
         reject(error);
       });
 
     });
   }
 
   pushSessions() {
     return new Promise((resolve, reject) => {
 
       let query = "UPDATE " + table + " SET ";
       query += "sessions = '" + JSON.stringify(this.sessions) + "' ";
       query += "WHERE id = \'" + encode(this.id) + "\'";
 
       database.query(query).then(res => {
         return resolve();
       }).catch(error => {
         return reject(error);
       });
 
     });
   }
 
   createSession(req, client) {
     req.session.account = new Object();
 
     req.session.account.login = true;
     req.session.account.id = this.id;
 
     req.session.account.permissions = this.permissions;
     req.session.account.perm = this.permissions; //legacy
     req.session.account.name = decode(this.name);
     req.session.account.email = decode(this.email);
 
     if (req.body.keep + "" == "true") {
       req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 100;
     }
 
     req.session.save();
 
     var session = new Session(req.sessionID, req.session, {
       ip: client.ip,
       agent: client.agent,
       browser: client.browser,
       system: client.system
     });
 
     this.sessions.push(session);
   }
 
   deleteSession(sessionID) {
     return new Promise((resolve, reject) => {
       var query = "DELETE FROM sessions WHERE session_id = '" + encode(sessionID) + "';";
 
       database.query(query).then(data => {
         var l = this.sessions.length;
         for (var i = 0; i < l; i++) {
           if (this.sessions[i].id = sessionID) {
             this.sessions.splice(i, 1);
             break;
           }
         }
         resolve();
       }).catch((error) => {
         reject(error);
       });
     });
   }
 
   deleteSessions() {
     return new Promise((resolve, reject) => {
       var list = [];
       for (var session of this.sessions) {
         list.push(session.id);
       }
 
       var query = "DELETE FROM sessions WHERE session_id in (";
       for (var n = 0; n < list.length; n++) {
         query += "'" + list[n] + "', "
       }
       query += "'');";
 
       database.query(query).then(data => {
         this.sessions = [];
         resolve();
       }).catch((error) => {
         reject(error);
       });
     });
   }
 
 }
 module.exports.Account = Account;
 
 /**
  * @async
  * @function getAccount
  * @param {string} id Account's id
  * @return {object} Account data
  */
 function getAccount(id) {
   return new Promise((resolve, reject) => {
     var account = new Account(id);
     account.pull().then(() => {
       resolve(account);
     }).catch((error) => {
       if (error == null) {
         resolve(null);
       }
       else {
         reject(error);
       }
     });
   });
 }
 module.exports.getAccount = getAccount;
 
 function getAccounts(size, page, where = false, and = false, count = false) {
   return new Promise((resolve, reject) => {
 
     size = encode(size) * 1;
     page = encode(page) * 1;
 
     let query = "";
     if (!count) {
       query += "SELECT id, name, perm FROM " + table + " ";
     }
     else {
       query += "SELECT COUNT(id) FROM " + table + " ";
     }
     if (where) {
       query += "WHERE ( ";
       if (and) {
         for (var k in where) {
           var key = encode(k);
           var value = encode(where[k]);
           query += key + " LIKE '%" + value + "%' AND ";
         }
         query = query.slice(0, -4);
       }
       else {
         for (var k in where) {
           var key = encode(k);
           var value = encode(where[k]);
           query += key + " LIKE '%" + value + "%' OR ";
         }
         query = query.slice(0, -3);
       }
       query += " ) ";
     }
     query += "ORDER BY registerdate ASC LIMIT " + size + " OFFSET " + ((page - 1) * size) + ";";
 
     database.query(query).then(res => {
 
       if (!count) {
         var accounts = new Array();
         for (var a of res) {
           var account = new Account(a.id);
           account.name = a.name;
           var permissions = new Array();
           try {
             permissions = JSON.parse(a.perm);
           } catch (error) { }
           account.permissions = permissions;
           delete account.email;
           delete account.phone;
           delete account.sessions;
           accounts.push(account);
         }
 
         resolve(accounts);
       }
       else {
         resolve(res[0]["COUNT(id)"]);
       }
 
     }).catch((error) => {
       reject(error);
     });
 
   });
 }
 module.exports.getAccounts = getAccounts;
 
 function getClient(req) {
   var client = new Object();
   if (req.session && req.session.account) {
     client = req.session.account;
   }
 
   var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
   if (ip.substr(0, 7) == "::ffff:") { ip = ip.substr(7); }
   let agent = req.headers['user-agent'];
 
   client.ip = ip;
   client.agent = agent;
 
   var clientNavigator = getClientNavigator(client.agent);
   client.browser = clientNavigator.browser;
   client.system = clientNavigator.system;
 
   return client;
 }
 module.exports.getClient = getClient;
 
 const wanyneServer = require("../app.js");
 
 class Session {
 
   constructor(id, data, clientData) {
     this.id = id;
     this.data = data;
     this.clientData = clientData;
   }
 
 }
 
 function getSession(sessionStore, sessionID) {
   return new Promise((resolve, reject) => {
     sessionStore.get(sessionID, (error, session) => {
       if (error) {
         reject(error);
       }
       else {
         resolve(session);
       }
     });
   });
 }
 
 function checkPermission(source, target) {
   var sourceArray = source.split(".");
   var targetArray = target.split(".");
   var loop = Math.max(sourceArray.length, targetArray.length);
   var bool = false;
   var lastSource;
   for (var n = 0; n < loop; n++) {
     if (!(sourceArray[n] == null || sourceArray[n] == undefined)) {
       lastSource = sourceArray[n];
     }
     if ((lastSource == targetArray[n]) || (lastSource == "*" && !(targetArray[n] == null || targetArray[n] == undefined))) {
       bool = true;
     }
     else {
       bool = false;
     }
     if (!bool) {
       break;
     }
   }
   return bool;
 }
 
 function checkArrayPermission(array, permission) {
   var bool = false;
   for (perm of array) {
     if (perm.startsWith("-")) {
       if (checkPermission(perm.substring(1), permission)) {
         return false;
       }
     }
     else {
       bool = checkPermission(perm, permission);
     }
     if (bool) {
       return true;
     }
   }
   return false;
 }
 
 function getClientNavigator(ua) {
 
   var browser;
   var system;
 
   if (!ua) {
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
 
 module.exports.isLogin = function (req) {
   var client = getClient(req);
   if (!client || !client.login || !client.id || !client.permissions) {
     return false;
   }
   return true;
 }
 
 module.exports.hasPermission = function (client, permission) {
   if (!client || !client.login || !client.id || !client.permissions) {
     return false;
   }
   return checkArrayPermission(client.permissions, permission);
 }
 
 module.exports.update = function (req) {
   return new Promise((resolve, reject) => {
 
     var client = getClient(req);
 
     if (!client || !client.login || !client.id || !client.permissions) {
       resolve();
     }
 
     var account = new Account(client.id);
     account.pull().then(() => {
       req.session.account.name = account.name;
       req.session.account.permissions = account.permissions;
       req.session.account.email = account.email;
       req.session.save();
       resolve();
     }).catch((error) => {
       reject(error);
     });
 
   });
 }