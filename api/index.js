
const express = require('express');
const fs = require('fs');

module.exports = posts => {
  const api = express.Router();

  api.get('/posts', (req, res) => {
    const stuff = {
      posts:[
        {name: 'another post', rendered: '<h1>async magic!</h1>'},
      ]
    };

    posts.forEach(post => {
      try {
        if(post.filename)
          post.text = fs.readFileSync(post.filename).toString();
      } catch(e) {
        if(e.code === 'ENOENT')
        {
          const errorMsg = `file ${post.filename} not found for post '${post.name}'`;
          console.warn(errorMsg);
          post.rendered = errorMsg
        }
        else
          throw e;
      }

      if(post.render)
        post.rendered = post.render(post.text, post);

      stuff.posts.push(post);
    });

    res.json(stuff);
  });

  return api
}
