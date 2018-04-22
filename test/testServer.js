
const path = require('path');
const express = require('express');
const babyGotBackend = require('../index');

const here = (filename) => path.join(__dirname, filename);
let fauxMdRender = (text, post) => {
  if(text) {
    return '<!DOCTYPE html><html><head></head><body>' +
      `<h1>${post.name}</h1>` +
      text.split('\n').map(line => `<p>${line}</p>`).join('') + '</body></html>';
  }
};

const app = express();

app.use('/admin', babyGotBackend([
  {
    name: 'hello',
    route: '/hello',
    filename: here('testing.html'),
    render: text => `<h1>${text}</h1>`
  },
  {
    name: 'example markdown',
    route: '/example',
    filename: here('examplePost.md'),
    render: fauxMdRender
  },
  {
    name: 'example file not found',
    route: 'ooojson',
    filename: here('sokd'),
    contentType: 'json'
  }
]));

app.get('*', (req, res) => {
  res.send('testServer.js')
  console.log('testServer')
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`serving on port ${port}`)
});
