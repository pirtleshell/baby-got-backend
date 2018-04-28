
import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContent: this.props.editingText,
    }
  }

  componentDidMount() {
    const domElement = document.getElementById('editor');
    this.codemirror = CodeMirror(domElement, {
      value: this.state.currentContent,
      mode: 'markdown',
      lineWrapping: true,
    });
  }

  render() {
    const { className, editingText, filename } = this.props;

    return (
      <div id='editor' className={className} />
    );
  }
}

Editor.propTypes = {
  editingText: PropTypes.string,
  filename: PropTypes.string,
};

export default Editor;
