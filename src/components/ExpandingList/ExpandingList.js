'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import ListBlock from './ListBlock';

class ExpandingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    console.log('rendering expandinglist!')
    const tree = [
      {
        name: 'Pages',
        nodes: [...Array(100).keys()].forEach(i => {
          return { name: `Post ${i}!` };
        }),
      }
    ];

    let blocks;
    if(Array.isArray(tree)) {
      blocks = tree.map((item, i) => {
        return (<li key={i}>{item.name}</li>)
      })
    }

    return (
      <ul>
        {blocks}
      </ul>
    );
  }
}

ExpandingList.propTypes = {};

export default ExpandingList;
