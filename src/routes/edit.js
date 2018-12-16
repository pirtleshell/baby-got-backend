
import React from 'react';
import Editor from '../components/Editor';
import RenderedView from '../components/RenderedView';

import Api from '../api';
const api = new Api();

let fauxMdRender = post => {
  const text = post.text;
  if(text) {
    return `<h1>${post.name}</h1>` +
      text.split('\n').map(line => {
        let tag = 'p';

        let hlevel = 0;
        while(line[hlevel++] === '#');
        hlevel -= 1;
        if(hlevel)
          tag = `h${hlevel}`;

        return `<${tag}>${line}</${tag}>`
      }).join('') + '</body></html>';
  }
  return post.rendered;
};

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.state = {
      postIsLoaded: false,
    }
  }

  componentDidMount() {
    const id = window.location.hash.split('/').pop();
    api.get(`posts/${id}`).then(post => {
      this.setState({
        post,
        currentText: post.text,
        postIsLoaded: true,
      });
    });
  }

  onEditorChange(newText) {
    if(this.state.currentText !== newText) {
      const data = {text: newText};
      const updateUrl = `posts/${this.state.post.id}/content`;
      api.post(updateUrl, data).then(updatedPost => {
        this.setState({post: updatedPost, currentText: newText});
      });
    }
  }

  render() {
    const { children } = this.props;

    if(!this.state.postIsLoaded)
      return (<p>Fetching Post...</p>);

    return (
      <div id='editor_container'>
        <Editor
          className='half_window'
          editingText={this.state.post.text}
          editorDidChange={this.onEditorChange}
          filename={this.state.post.filename}
        />
        <RenderedView
          id='editor_display'
          className='half_window'
          item={this.state.post}
        />
      </div>
    );
  }
}

export default Edit;
