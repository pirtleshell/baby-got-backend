
const fs = require('fs');
const path = require('path');
const express = require('express');

const here = filename => path.join(__dirname, filename);

module.exports = posts => {
  const api = express.Router();

  api.use('/docs', express.static(here('docs.html')));

  api.get('/posts', (req, res) => {
    const stuff = {
      posts:[
        {name: 'another post', rendered: '<h1>async magic!</h1>'},
      ]
    };
    stuff.concat(posts);

    res.json(stuff);
  });

  return api
}
