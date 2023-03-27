'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.ren('root', {
    title: '큐컴버리 Cucumbery | 마인-크래프트 플러그-인',
  });
});

router.get('/sans', (req, res) => {
  const i = Math.floor(Math.random() * 10);
  if ([0, 1, 2].includes(i)) {
    res.ren('root-en', {
      title: '큐컴버리 Cucumbery | 마인-크래프트 플러그-인',
    });
  } else if ([3].includes(i)) {
    res.error404();
  } else if ([4, 5].includes(i)) {
    res.redirect('https://maplestory.nexon.com');
  } else {
    res.status(400 + Math.floor(Math.random() * 200)).end();
  }
});

router.get('/ping', (req, res) => {
  res.send('pong!');
});

import apiRouter from './api/api-root.mjs';
router.use('/api', apiRouter);

export default router;
