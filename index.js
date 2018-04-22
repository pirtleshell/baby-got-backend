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
