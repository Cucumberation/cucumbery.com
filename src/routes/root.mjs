'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.ren('root', {
    title: '큐컴버리 Cucumbery | 마인-크래프트 플러그-인',
  });
});

router.get('/ping', (req, res) => {
  res.send('pong!');
});

export default router;
