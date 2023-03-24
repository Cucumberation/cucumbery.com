'use strict';

import express from 'express';
const router = express.Router();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.resolve(__dirname, '../../public/songs');

router.get('/', (req, res) => {
  fs.readdir(dir, (error, files) => {
    if (error) {
      res.error('default404');
      return;
    }

    const data = [];
    for (const name of files) {
      const file = path.resolve(dir, name);
      const stats = fs.statSync(file);
      data.push({
        name: name,
        size: stats.size,
        mtime: Math.floor(stats.mtimeMs),
      });
    }
    res.data(data);
  });
});

router.get('/:name*', (req, res) => {
  const name = req.params.name;
  const file = path.resolve(dir, name);

  if (!fs.existsSync(file)) {
    res.error('file404');
    return;
  }

  res.setHeader('Content-disposition', `attachment; filename="${name}"`);
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-type', 'application/octet-stream');

  fs.createReadStream(file).pipe(res);
});

export default router;
