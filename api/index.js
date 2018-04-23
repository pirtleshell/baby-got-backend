
const fs = require('fs');
const path = require('path');
const express = require('express');

const here = filename => path.join(__dirname, filename);

module.exports = posts => {
  const api = express.Router();

  api.use('/docs', express.static(here('docs.html')));

  api.get('/posts', (req, res) => {
    const stuff = [
      {name: 'another post', rendered: '<h1>async magic!</h1>'},
    ];

    res.json(stuff.concat(posts));
  });

  return api
}
