import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContent: '',
    };
  }

  componentDidMount() {
    console.log('codemirroreditor mounted');
    // setup codemirror
    console.log('component mounted');
    const codeMirrorOptions = {
      value: this.props.initialContent || '',
      mode: 'markdown',
      theme: 'default',
      lineWrapping: true,
    };
    const domElement = findDOMNode(this);
    this.codemirror = CodeMirror(domElement, codeMirrorOptions);
    document.querySelector('.CodeMirror').style = 'height: 100%';

    this.codemirror.on('change', (self) => {
      console.log('codemirror change');
      const text = self.getValue();
      const contentIsDifferent = this.state.currentContent !== text;
      if (contentIsDifferent) {
        if (this.props.editorDidChange) this.props.editorDidChange(text);
        this.setState({ currentContent: text });
      }
    });
  }

  componentDidUpdate(prevProps) {
    console.log('codemirroreditor updated');
    if (this.props.intialContent !== this.props.intialContent) {
      console.log('setting codemirror value!');
      this.codemirror.setValue(this.props.intialContent);
    }
  }

  render() {
    // see componentDidMount()

    const style = {
      height: 'calc(100% - 20px)',
      flex: 1,
    };
    return <div style={style} />;
  }
}

CodeMirrorEditor.propTypes = {
  editingText: PropTypes.string,
  filename: PropTypes.string,
  editorDidChange: PropTypes.func,
};

export default CodeMirrorEditor;
