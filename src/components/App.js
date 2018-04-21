
import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div id='app'>
        <div id='app_header'></div>
        <div id='app_main'>
          { children }
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
