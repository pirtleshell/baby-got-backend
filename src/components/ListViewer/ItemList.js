
import React from 'react';
import PropTypes from 'prop-types';

import ListBlock from './ListBlock';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, itemName, onItemClick, fetchMore, selectedKey } = this.props;

    return (
      <ul id='posts_list'>
        {items && items.map((item, i) => {
          const key = item.key ? item.key : i;
          return (
            <ListBlock
              key={key}
              item={item}
              itemName={itemName}
              clickHandler={onItemClick}
              selected={selectedKey === key}
            />
        )})}
        {fetchMore &&
          <ListBlock item={{name: 'Load More'}}
            clickHandler={fetchMore}
          />}
      </ul>
    );
  }
};

ItemList.propTypes = {
  itemName: PropTypes.string,
  items: PropTypes.array
};

export default ItemList;
