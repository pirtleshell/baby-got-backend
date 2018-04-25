
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const here = filename => path.join(__dirname, filename);

module.exports = posts => {
  const getPostById = (req, id) => posts.filter(p => (id == p.id));
  const api = express.Router();

  api.use(bodyParser.urlencoded({ extended: true }));
  api.use(bodyParser.json());

  api.use('/docs', express.static(here('docs.html')));

  // POSTS
  api.get('/posts', (req, res) => {
    const stuff = [
      {name: 'another post', rendered: '<h1>async magic!</h1>'},
    ];

    res.json(stuff.concat(posts));
  });

  api.post('/posts', (req, res) => {
    console.log(req.body)
    res.json({message: 'post added'});
  });

  api.get('/posts/:id', (req, res) => {
    const post = getPostById(req.params.id);
    if(!post) {
      res.status(404);
      res.send({message: 'post not found'});
    }
    res.json(post);
  });

  return api
}
