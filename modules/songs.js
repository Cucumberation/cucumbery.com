const config = require('../config.json');

const fs = require('fs');
const multer = require('multer');

function pushSong(req, res) {
  return new Promise((resolve, reject) => {

    pushSongFile(req, res).then(() => {
      resolve();
    }).catch((error) => {
      reject(error);
    });

  });
}
module.exports.pushSong = pushSong;

function pushSongFile(req, res) {
  return new Promise((resolve, reject) => {

    const u = multer({
      storage: multer.diskStorage({

        destination(req, file, callback) {
          let dir = config.path + '/public/songs/';
          req.w = new Object();
          req.w.dir = dir;
          callback(null, dir);
        },

        filename(req, file, callback) {
          if (fs.existsSync(req.w.dir + '/' + file.originalname)) {
            fs.unlinkSync(req.w.dir + '/' + file.originalname);
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