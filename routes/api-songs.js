const router = require('express').Router();
const log = require('../modules/log');
const APIMessage = require('./message.json');
const config = require('../config.json');

const songs = require('../modules/songs');

const fs = require('fs');
const mime = require('mime');
const contentDisposition = require('content-disposition');

router.get('/', (req, res) => {

  const path = config.path + '/public/songs';

  fs.readdir(path, (error, files) => {
    if (error) {
      res.status(200).send({ message: error });
      return;
    }
    const data = new Array();
    for (const file of files) {
      const stats = fs.statSync(config.path + '/public/songs/' + file);
      data.push({
        name: file,
        size: stats.size
      })
    }
    res.status(200).send({ message: 'songs', data: data });
  });

});

router.post('/', (req, res) => {

  songs.pushSong(req, res).then(() => {
    res.status(200).send({ message: APIMessage.default200 });
    return;
  }).catch((error) => {
    console.log(error);
    res.status(500).send({ message: APIMessage.default500 });
    return;
  });

});

router.get('/:name', (req, res) => {

  var name = req.params.name;
  var path = config.path + '/public/songs/' + name;

  if (!fs.existsSync(path)) {
    res.status(404).send({ message: APIMessage.file404 });
    return;
  }

  var filename = name;
  var mimetype = mime.lookup(path);
  res.setHeader('Content-disposition', 'attachment; filename=' + contentDisposition(filename));
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream(path);
  filestream.pipe(res);
  return;

});
router.get('/:name/download', (req, res) => {

  var name = req.params.name;
  var path = config.path + '/public/songs/' + name;

  if (!fs.existsSync(path)) {
    res.status(404).send({ message: APIMessage.file404 });
    return;
  }

  var filename = name;
  var mimetype = mime.lookup(path);
  res.setHeader('Content-disposition', 'attachment; filename=' + contentDisposition(filename));
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream(path);
  filestream.pipe(res);
  return;

});

module.exports = router;