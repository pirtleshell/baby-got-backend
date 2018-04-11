
const path = require('path');
const express = require('express');
const babyGotBackend = require('../src');

let renderer = (obj) => {
  if(obj.editor)
    return obj.editor
}

const app = express();

app.use('/admin', babyGotBackend([
  {
    route: '/hello',
    filename: path.join(__dirname, 'testing.html'),
    render: text => `<h1>${text}</h1>`
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
