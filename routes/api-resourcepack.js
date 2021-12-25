const router = require('express').Router();
const log = require('../modules/log');
const APIMessage = require('./message.json');
const config = require('../config.json');

const pack = require('../modules/resourcepack');

router.get('/ping', (req, res) => {
  res.send({ message: APIMessage.pong200 });
});

router.post('/', (req, res) => {

  pack.pushPack(req, res).then(() => {
    res.status(200).send({ message: APIMessage.default200 });
    return;
  }).catch((error) => {
    console.log(error);
    res.status(500).send({ message: APIMessage.default500 });
    return;
  });

});

module.exports = router;