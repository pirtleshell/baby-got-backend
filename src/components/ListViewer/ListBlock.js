
import React from 'react';
import PropTypes from 'prop-types';

import ItemList from './ItemList';
import ListBlockButtons from './ListBlockButtons';

import pencil from '../icons/pencil.svg';

class ListBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onBlockClick = this.onBlockClick.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.state = {
      expanded: false,
    };
  }

  onBlockClick(event) {
    if(this.props.clickHandler)
      this.props.clickHandler(this.props.item);
  }

  toggleExpansion() {
    this.setState(prevProps => {
      return {expanded: !prevProps.expanded}
    });
  }

  render() {
    const { item, itemName, clickHandler, selected } = this.props;

    if(!item) return;

    const buttons = [];
    if(item.id)
      buttons.push( {iconUri: pencil, href: `#/edit/${item.id}`, name: 'Edit'} );

    let subitems = [];
    if(item.subitems) {
      buttons.push( {text: '➕', 'func': this.toggleExpansion} );
      subitems = item.subitems;
    }

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
      <div>
        <a onClick={this.onBlockClick}>
          <li className={className}>
            {blockText}
            <ListBlockButtons buttons={buttons} />
          </li>
        </a>
        {this.state.expanded && subitems.length &&
          <ItemList items={subitems}
            onItemClick={this.props.clickHandler}
          />}
      </div>
    );
  }
};

ListBlock.propTypes = {
  item: PropTypes.object,
  itemName: PropTypes.string,
  clickHandler: PropTypes.func,
};




export default ListBlock;
