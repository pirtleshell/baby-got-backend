'use strict';

const fs = require('fs');
const express = require('express');
const BabyGotError = require('./errors');

module.exports = function(options) {
  console.log('loaded')

  const bbgbe = express.Router();

  //////////////////
  // Fixed Routes //
  //////////////////
  bbgbe.get('/login', (req, res, next) => {
    console.log('trying to login')
    next();
  });

  bbgbe.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
  })

  ///////////////////
  // Process Pages //
  ///////////////////
  let pageSpecs;
  if(Array.isArray(options))
  {
    pageSpecs = options;
    options = {};
  } else if(pageSpecs)
    pageSpecs = options.pageSpecs;
  else
    throw BabyGotError('[BabyGotBackEnd] no pageSpecs found')

  pageSpecs.forEach(page => {
    bbgbe.get(page.route, (req, res) => {
      const contentType = page.contentType || 'text/html; charset=utf-8';
      let { filename, render } = page;

      if(!render)
        render = contents => contents;

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

  ///////////////
  // Catch All //
  ///////////////
  bbgbe.get('*', (req, res) => {
    res.send('babyGotBackend')
    console.log('babyGotBackend')
  })

  return bbgbe;
}
