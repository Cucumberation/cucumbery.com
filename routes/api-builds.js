const router = require('express').Router();
const log = require('../modules/log');
const APIMessage = require("./message.json");

const fs = require('fs');
const mime = require('mime');
const builds = require('../modules/builds');

router.get('/ping', (req, res) => {
  res.send({ message: APIMessage.pong200 });
});

router.get('/index', (req, res) => {

  builds.getBuilds().then(data => {
    res.send({ message: APIMessage.default200, data: data });
    return;
  }).catch((error) => {
    log.error(error);
    res.status(500).send({ message: APIMessage.default500 });
    return;
  });

});

router.get('/:channel/:version', (req, res) => {

  var channel = req.params.channel;
  var version = req.params.version;
  var pluginAPI = req.query.api;

  builds.getBuild(channel, version, pluginAPI).then(data => {
    res.send({ message: APIMessage.default200, data: data });
    return;
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.build404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

router.post('/:channel/:version', (req, res) => {

  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var channel = req.params.channel;
  var version = req.params.version;
  var pluginAPI = req.query.api;
  var name = req.query.name;
  var key = req.query.key;

  if (!pluginAPI) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  if (!key) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }

  if (!name) {
    name = channel + "-" + version;
  }

  builds.pushBuild(key, name, channel, version, pluginAPI, req, res).then(() => {
    log.info("Builds push => " + name);
    res.send({ message: APIMessage.default200 });
    return;
  }).catch((error) => {
    console.log(error);
    res.status(500).send({ message: APIMessage.default500 });
    return;
  });

});

router.get('/:channel/:version/download', (req, res) => {

  var channel = req.params.channel;
  var version = req.params.version;
  var pluginAPI = req.query.api;

  builds.getBuild(channel, version, pluginAPI).then(data => {
    var file = data.filepath;
    if (!fs.existsSync(file)) {
      res.status(404).send({ message: APIMessage.file404 });
      return;
    }
    var filename = data.name + ".jar";
    var mimetype = mime.lookup(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
    return;
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.build404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

module.exports = router;