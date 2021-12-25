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
const clientKey = {
  hash: "9b2114bc57ce1275edf26324798807edfdfa044b8ba74cbea25d828391503af37ff9d32b92aecd1803c957b2a429bea2d5e48c70fc811b2de534da0f47fdbe9a",
  salt: "c19178765018871bf3ff55443f6b1b4b9805c9e97de078643a25e2ce162828d384d05dcabbc3865aa896803a0e804cdb5a5e43f5747391559760c1d518750734",
};

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

function pushPack(req, res) {
  return new Promise((resolve, reject) => {

    var key = req.query.key;

    checkKey(key).then(() => {
      pushPackFile(req, res).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });

  });
}
module.exports.pushPack = pushPack;

function pushPackFile(req, res) {
  return new Promise((resolve, reject) => {

    const u = multer({
      storage: multer.diskStorage({

        destination(req, file, callback) {
          let dir = config.path + '/public/';
          req.w = new Object();
          req.w.dir = dir;
          callback(null, dir);
        },

        filename(req, file, callback) {
          if (fs.existsSync(req.w.dir + '/resourcepack.zip')) {
            fs.unlinkSync(req.w.dir + '/resourcepack.zip');
          }
          callback(null, file.originalname); 
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