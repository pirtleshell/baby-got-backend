
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const express = require('express');
const babyGotBackend = require('../index');

const readFile = promisify(fs.readFile);

const here = (filename) => path.join(__dirname, filename);
let fauxMdRender = (text, post) => {
  if(text) {
    return `<h1>${post.name}</h1>` +
      text.split('\n').map(line => `<p>${line}</p>`).join('');
  }
};

let pseudoHandlebars = (text, dataObject) => {
  if(!text) text = '';
  let tokens = text.toString().split(/({{|}})/g);
  let cur;
  while((cur = tokens.indexOf('{{')) >= 0) {
    // N.B.: will break when template leaves open '{{
    tokens.splice(cur, 1);
    let parts = tokens[cur].trim().split('.');
    let value = dataObject;
    let i = 0;
    while(parts.length > i++)
      value = value[parts[i - 1]];
    tokens[cur] = value;
    tokens.splice(cur + 1, 1);
  }
  return tokens.join('');
};

let pseudoPugFile = async (filename, dataObject) => {
  return await readFile(filename).then(text =>
    pseudoHandlebars(text, dataObject)
  );
};

const app = express();


const posts = [
  {
    id: 1,
    name: 'hello',
    route: '/hello',
    filename: here('testing.html'),
    render: text => `<h1>${text}</h1>`
  },
  {
    id: 2,
    name: 'example markdown',
    route: '/example',
    filename: here('examplePost.md'),
    render: fauxMdRender
  },
  {
    id: 'wafflestheverb', // as in, "they've been waffling the verb for days!"
    name: 'example file not found',
    route: 'ooojson',
    filename: here('sokd'),
    contentType: 'json'
  },
  {
    id: 'magic-handle',
    name:'Can You Handle It?',
    template: here('magic.handles'),
    foo: { bar: 'foobar' },
    render: pseudoHandlebars
  }
];
let attachSubitems = post => {
  post.subitems = [...Array(5)].map((t,i) => ({name: `Subblock ${post.id}.${i}`}));
};
posts.forEach(attachSubitems);

app.use('/admin', babyGotBackend(posts));

app.get('*', (req, res) => {
  res.send('testServer.js')
  console.log('testServer')
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`serving on port ${port}`)
});
