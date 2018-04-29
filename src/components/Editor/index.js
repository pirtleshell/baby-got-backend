
import React from 'react';
import PropTypes from 'prop-types';
import CodeMirrorEditor from './CodeMirrorEditor';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.initialContent = this.props.editingText;
  }

  onEditorChange(newText) {
    if(this.props.editorDidChange)
      this.props.editorDidChange(newText);
  }

  render() {
    const { className, editorDidChange, editingText, filename } = this.props;
    return (
      <div id='editor' className={className}>
        {filename && (<div>You're editing {filename}</div>)}
        <CodeMirrorEditor
          initialContent={this.initialContent}
          editorDidChange={this.onEditorChange}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  className: PropTypes.string,
  editorDidChange: PropTypes.func,
  editingText: PropTypes.string,
};

export default Editor;
