const router = require('express').Router();
const log = require('../modules/log');

router.get('/', (req, res) => {
  res.render("root");
});

router.use('/api', require('./api.js'));

router.use('/builds', require('./builds.js'));

router.use('/songs', require('./songs.js'));

module.exports = router;