
import examplePost from './examplePost.md';

module.exports = [
  {
    name: 'Lots of Posts',
    render: (post) => {
      const text = post.text;
      return text.split('\n').map(line => `<p>${line}</p>`).join('')
    },
    text: examplePost
  },
  {
    name: 'Lots of Posts',
    rendered: '<h1>This is it!</h1><p>A rendered post</p>'
  },
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {
    name: 'Oooga Booga',
    rendered: '<img src="https://placebear.com/700/2000" />'
  },
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {
    name: 'Cheers',
    rendered: '<img src="https://placebeer.com/850/1900" />'
  },
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
  {name: 'Lots of Posts'},
]
