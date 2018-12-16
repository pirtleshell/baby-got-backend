
import React from 'react';
import PropTypes from 'prop-types';

import ListViewer from '../components/ListViewer';

class Dashboard extends React.Component {

  render () {
    return (
      <ListViewer itemName='Post' />
    );
  }
}

export default Dashboard;
