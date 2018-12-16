
import React from 'react';
import PropTypes from 'prop-types';
import ListBlockButtons from './ListBlockButtons';

import pencil from '../icons/pencil.svg';

class ListBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onBlockClick = this.onBlockClick.bind(this);
  }

  onBlockClick(event) {
    if(this.props.clickHandler)
      this.props.clickHandler(this.props.item);
  }

  render() {
    const { item, itemName, clickHandler, selected } = this.props;

    if(!item)
      return;

    const buttons = [];
    if(item.id)
      buttons.push( {iconUri: pencil, href: `#/edit/${item.id}`, name: 'Edit'} );

    let className = 'posts_listblock';
    if(selected)
      className += ' selected';

    let blockText = item.name;
    if(blockText == null)
    {
      blockText = `Untitled ${itemName}`;
      blockText += item.id ? ` (${item.id})` : '';
    }

    return (
      <a onClick={this.onBlockClick}>
        <li className={className}>
          {blockText}
          <ListBlockButtons buttons={buttons} />
        </li>
      </a>
    );
  }
};

ListBlock.propTypes = {
  item: PropTypes.object,
  itemName: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default ListBlock;
