
import React from 'react';
import Editor from '../components/Editor';
import RenderedPost from '../components/RenderedPost';

import Api from '../api';
const api = new Api();

let fauxMdRender = post => {
  const text = post.text;
  if(text) {
    return '<!DOCTYPE html><html><head></head><body>' +
      `<h1>${post.name}</h1>` +
      text.split('\n').map(line => `<p>${line}</p>`).join('') + '</body></html>';
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
        postIsLoaded: true,
      });
    });
  }

  onEditorChange(newText) {
    // TODO: post (& save?) the data and get rendered content from server
    const updatedPost = Object.assign({}, this.state.post,
      {text: newText}
    );
    updatedPost.rendered = fauxMdRender(updatedPost);
    this.setState({post: updatedPost});
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
        <RenderedPost
          id='editor_display'
          className='half_window'
          post={this.state.post}
        />
      </div>
    );
  }
}

export default Edit;
