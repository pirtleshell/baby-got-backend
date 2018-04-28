
import React from 'react';
import PropTypes from 'prop-types';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, editingText, filename } = this.props;

    return (
      <div id='editor' className={className}>
       {editingText}
      </div>
    );
  }
}

Editor.propTypes = {
  editingText: PropTypes.string,
  filename: PropTypes.string,
};

export default Editor;
