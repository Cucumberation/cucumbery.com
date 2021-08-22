const router = require('express').Router();
const log = require('../modules/log');
const config = require('../config.json');

const fs = require('fs');
const mime = require('mime');

router.get('/', (req, res) => {
  res.render('songs/root');
});

router.get('/list', (req, res) => {
  var path = config.path + "/public/songs";
  console.log(path);
  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  fs.readdir(path, (error, files) => {
    for (var file of files) {
      res.write(file + "<br>");
    }
    res.end("");
  });
});

module.exports = router;