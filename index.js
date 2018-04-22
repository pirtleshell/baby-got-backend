'use strict';

const fs = require('fs');
const express = require('express');
const ReactDOM = require('react-dom/server');

const api = require('./api');
const BabyGotError = require('./src/errors');

module.exports = function(options) {
  const bbgbe = express.Router();

  ///////////////////
  // Process Pages //
  ///////////////////
  let pageSpecs;
  if(Array.isArray(options))
  {
    pageSpecs = options;
    options = {};
  }
  else if((options || {}).pageSpecs)
    pageSpecs = options.pageSpecs;
  else
    throw new BabyGotError('no pageSpecs found')

  pageSpecs.forEach(page => {
    bbgbe.get(page.route, (req, res) => {
      const contentType = page.contentType || 'text/html; charset=utf-8';
      console.log(contentType)
      let { filename, render } = page;

      if(filename) {
        fs.readFile(filename, (error, contents) => {
          if(error)
            return res.send(error)
          contents = contents.toString();
          const html = render ? render(contents) : contents;

          res.status(200);
          res.header('Content-Type: ' + contentType);
          res.send(html);
        })
      }
    });
  });

  //////////////////
  // Fixed Routes //
  //////////////////
  bbgbe.get('/login', (req, res, next) => {
    console.log('trying to login')
    next();
  });

  bbgbe.use('/api', api(pageSpecs));

  ///////////////
  // Catch All //
  ///////////////
  bbgbe.get('*', express.static('public'))

  return bbgbe;
}
