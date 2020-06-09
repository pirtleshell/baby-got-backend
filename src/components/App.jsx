import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, routes } = this.props;
    console.log('rendering app');

    const Routes = routes.map((item, i) => (
      <Route key={i} exact path={item.route} component={() => item.component} />
    ));

    return (
      <Router>
        <div id="app">
          <Header />
          <div id="app_main">{Routes}</div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array,
};

export default App;
