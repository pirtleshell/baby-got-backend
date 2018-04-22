
const express = require('express');

module.exports = posts => {
  const api = express.Router();

  api.get('/posts', (req, res) => {
    res.json({
      posts:[
        {name: 'another post', rendered: '<h1>async magic!</h1>'},
      ]
    });
  });

  return api
}
