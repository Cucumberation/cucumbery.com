'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.ok('Cucumbery API');
});

import songsRouter from './api-songs.mjs';
router.use('/songs', songsRouter);

export default router;
