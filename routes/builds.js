const router = require('express').Router();
const log = require('../modules/log');

router.get('/', (req, res) => {
  res.render('builds/root');
});

router.get('/index', (req, res) => {
  res.render('builds/index');
});

module.exports = router;