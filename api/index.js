
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const here = filename => path.join(__dirname, filename);
const renderPost = post => {
  let text = post.rendered;
  if(post.render) {
    try { text = post.render(post.text, post); }
    catch (e) { text = `<h1>error rendering post:</h1><p>${e.message}</p>`; }
  }
  else if(post.text)
    text = post.text;

  return text;
}

module.exports = posts => {
  const getPostById = id => posts.filter(p => (id == p.id))[0];
  const send404 = (res, message) => res.status(404).json({message});
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

  // Create a post
  api.post('/posts', (req, res) => {
    res.json({message: 'post added (not really)'});
  });

  // Retrieve a post
  api.get('/posts/:id', (req, res) => {
    const post = getPostById(req.params.id);
    if(!post)
      return send404('post not found');
    res.json(post);
  });

  // Update a post
  api.post('/posts/:id/content', (req, res) => {
    const post = getPostById(req.params.id);
    if(!post)
      return send404('post not found');

    post.text = req.body.text;
    post.rendered = renderPost(post);

    // TODO: accept save func override
    if(post.filename) {
      fs.writeFile(post.filename, req.body.text, (error, data) => {
        if(error)
          return res.json({error});
        res.json(post);
      });
    } else
      res.json(post);
  });

  return api
}
