import express from 'express';

const a = express();
a.get('/', (req, res) => {
  res.send('ok');
});
a.listen(8080);
