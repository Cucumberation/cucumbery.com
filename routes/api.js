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

router.use('/songs', require('./api-songs'));

router.use('/resourcepack', require('./api-resourcepack'));

router.all('*', (req, res) => {
  res.status(404).send({ message: APIMessage.default404 });
});

module.exports = router;