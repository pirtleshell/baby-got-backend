
import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    const stuff = [];
    let i = 0;
    while(i < 50)
      stuff.push(<p key={i++}>some stuff</p>)

    return (
      <div id='editor_container'>
        <div id='editor' className='half_window'>
          {stuff}
        </div>
        <div id='editor_display' className='half_window'>
          {stuff}
        </div>
      </div>
    );
  }
}

export default Editor;
