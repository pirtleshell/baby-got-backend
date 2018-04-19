
const path = require('path');
const express = require('express');
const babyGotBackend = require('../index');

const here = (filename) => path.join(__dirname, filename);
let fauxMdRender = (text) => '<!DOCTYPE html><html><head></head><body><p>' +
  text.split('\n').map(line => `${line}</p>`).join('') + '</body></html>';

const app = express();

app.use('/admin', babyGotBackend([
  {
    route: '/hello',
    filename: here('testing.html'),
    render: text => `<h1>${text}</h1>`
  },
  {
    route: '/example',
    filename: here('examplePost.md'),
    render: fauxMdRender
  },
  {
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
