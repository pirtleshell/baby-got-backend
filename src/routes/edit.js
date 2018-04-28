
import React from 'react';
import Editor from '../components/Editor';

import Api from '../api';
const api = new Api();

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingText: 'Loading post info',
      renderedContent: '<p>Loading post info</p>',
    }
  }

  componentDidMount() {
    const id = window.location.hash.split('/').pop();
    api.get(`posts/${id}`).then(data => {
      this.setState({
        editingText: data.text,
        renderedContent: data.rendered,
      });
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div id='editor_container'>
        <Editor
          className='half_window'
          editingText={this.state.editingText}
        />
        <div
          id='editor_display'
          className='half_window'
          dangerouslySetInnerHTML={{__html: this.state.renderedContent}}
        />
      </div>
    );
  }
}

export default Edit;
