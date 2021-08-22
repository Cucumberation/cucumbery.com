const router = require('express').Router();
const log = require('../modules/log');
const APIMessage = require("./message.json");
const config = require('../config.json');

const fs = require('fs');
const mime = require('mime');

router.get('/', (req, res) => {
  res.status(200).send({ message: "Cucumbery API" });
});

router.use('/accounts', require('./api-accounts'));

router.use('/builds', require('./api-builds'));

router.get('/songs', (req, res) => {

  var path = config.path + "/public/songs";

  fs.readdir(path, (error, files) => {
    res.status(200).send({ message: "songs", data: files });
  });

});

router.get('/songs2', (req, res) => {

  var path = config.path + "/public/songs";

  fs.readdir(path, (error, files) => {
    var data = [];
    for (var file of files) {
      var stats = fs.statSync(config.path + "/public/songs/" + file);
      data.push({
        name: file,
        size: stats.size
      })
    }
    res.status(200).send({ message: "songs", data: data });
  });

});

const contentDisposition = require('content-disposition');
router.get('/songs/:name', (req, res) => {

  var name = req.params.name;
  var path = config.path + "/public/songs/" + name;

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
router.get('/songs/:name/download', (req, res) => {

  var name = req.params.name;
  var path = config.path + "/public/songs/" + name;

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

const songs = require("../modules/songs");
router.post('/songs/upload', (req, res) => {

  songs.pushSong(req, res).then(() => {
    res.send({ message: APIMessage.default200 });
    return;
  }).catch((error) => {
    console.log(error);
    res.status(500).send({ message: APIMessage.default500 });
    return;
  });
  return;

});

router.all('*', (req, res) => {
  res.status(404).send({ message: APIMessage.default404 });
});

module.exports = router;