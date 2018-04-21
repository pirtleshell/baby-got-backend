
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Dashboard from './routes/Dashboard';

import css from './style.css';

// import Html from './components/Html';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <App>
        <Dashboard />
      </App>
    );
  }
}



ReactDOM.render(<MainContent />, document.getElementById('mainContent'));
