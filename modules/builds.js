/**
 * builds.js
 * 
 * (c) 2020-2021 Wany
 * 
 * @summary plugin builds
 * @author Wany <sung@wany.io>
*/

const config = require('../config.json');

const database = require('./database.js');
const time = require('./time.js');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const table = exports.table = "cucumbery_builds";
const clientKey = {
  hash: "9b2114bc57ce1275edf26324798807edfdfa044b8ba74cbea25d828391503af37ff9d32b92aecd1803c957b2a429bea2d5e48c70fc811b2de534da0f47fdbe9a",
  salt: "c19178765018871bf3ff55443f6b1b4b9805c9e97de078643a25e2ce162828d384d05dcabbc3865aa896803a0e804cdb5a5e43f5747391559760c1d518750734",
};

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

function getBuild(channel, version, pluginAPI) {
  return new Promise((resolve, reject) => {

    channel = encode(channel);
    version = encode(version);
    pluginAPI = encode(pluginAPI);

    let query;
    if (!pluginAPI) {
      if (version == "latest") {
        query = "SELECT * FROM " + table + " WHERE channel = '" + channel + "' ORDER BY builddate DESC LIMIT 1;";
      }
      else {
        query = "SELECT * FROM " + table + " WHERE channel = '" + channel + "' AND version = '" + version + "' ORDER BY builddate DESC LIMIT 1;";
      }
    }
    else {
      if (version == "latest") {
        query = "SELECT * FROM " + table + " WHERE channel = '" + channel + "' AND pluginAPI = '" + pluginAPI + "' ORDER BY builddate DESC LIMIT 1;";
      }
      else {
        query = "SELECT * FROM " + table + " WHERE channel = '" + channel + "' AND version = '" + version + "' AND pluginAPI = '" + pluginAPI + "' ORDER BY builddate DESC LIMIT 1;";
      }
    }

    database.query(query).then(res => {
      if (res.length == 0) {
        reject(null);
      }
      //res[0].passeddatetime = time.compare("now", res[0].builddate, {});
      resolve(res[0]);
    }).catch((error) => {
      reject(error);
    });

  });
}
module.exports.getBuild = getBuild;

function pushBuild(key, name, channel, version, pluginAPI, req, res) {
  return new Promise((resolve, reject) => {

    checkKey(key).then(() => {
      checkBuildDatabase(channel, version).then(() => {
        pushBuildFile(name, channel, version, req, res).then(() => {
          var filepath = req.w.dir + "/" + req.w.name;
          pushBuildDatabase(name, filepath, channel, version, pluginAPI).then(() => {
            resolve();
          }).catch((error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });

  });
}
module.exports.pushBuild = pushBuild;

function checkKey(key) {
  return new Promise((resolve, reject) => {

    getHash(key, clientKey.salt).then(hash => {
      if (hash === clientKey.hash) {
        resolve();
      }
      else {
        reject(403);
      }
    }).catch((error) => {
      reject(error);
    });

  });
}
function checkBuildDatabase(channel, version) {
  return new Promise((resolve, reject) => {

    resolve();

  });
}
function pushBuildFile(name, channel, version, req, res) {
  return new Promise((resolve, reject) => {

    const u = multer({
      storage: multer.diskStorage({

        destination(req, file, callback) {
          let dir = config.path + "/data/cucumbery/builds/" + channel;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
          }
          dir = dir + '/' + version;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
          }

          req.w = new Object();
          req.w.dir = dir;
          callback(null, req.w.dir);
        },

        filename(req, file, callback) {
          req.w.name = name + ".jar";
          callback(null, req.w.name);
        }

      })
    }).single('file');

    u(req, res, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve();
    });

  });
}
function pushBuildDatabase(name, filepath, channel, version, pluginAPI) {
  return new Promise((resolve, reject) => {

    name = encode(name);
    filepath = encode(filepath);
    channel = encode(channel);
    version = encode(version);
    pluginAPI = encode(pluginAPI);

    let query = "INSERT INTO " + table + " (name, channel, version, pluginAPI, filepath, builddate) VALUES ("
    query += "'" + name + "', ";
    query += "'" + channel + "', ";
    query += "'" + version + "', ";
    query += "'" + pluginAPI + "', ";
    query += "'" + filepath + "', ";
    query += "'" + time.datetime("YYYY-MM-DD hh:mm:ss", "now") + "');";

    database.query(query).then(res => {
      resolve();
    }).catch((error) => {
      reject(error);
    });

  });
}

function getBuilds() {
  return new Promise((resolve, reject) => {

    let query = "SELECT * FROM " + table + " ORDER BY builddate DESC;";

    database.query(query).then(res => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });

  });
}
module.exports.getBuilds = getBuilds;