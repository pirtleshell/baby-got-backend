'use strict';

const fs = require('fs');
const path = require('path');
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
  if(Array.isArray(options)) {
    pageSpecs = options;
    options = {};
  }
  else if((options || {}).pageSpecs)
    pageSpecs = options.pageSpecs;
  else
    throw new BabyGotError('no pageSpecs found');

  // read files & render content
  pageSpecs.forEach(page => {
    if(page.template)
      page.filename = page.template;
    try {
      if(page.filename)
        page.text = fs.readFileSync(page.filename).toString();
    } catch(e) {
      if(e.code === 'ENOENT') {
        const errorMsg = `file ${page.filename} not found for page '${page.name}'`;
        console.warn(errorMsg);
        page.rendered = errorMsg;
      }
      else throw e;
    }

    if(page.render)
      page.rendered = page.render(page.text, page);
  });

  let objectTypes = [ { name: 'Pages', items: pageSpecs } ];
  if(options.objectTypes) {
    objectTypes = objectTypes.concat(options.objectTypes);
  }

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
  bbgbe.get('*', express.static(path.join(__dirname, 'public')))

  return bbgbe;
}
