
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
      this.props.clickHandler(this.props.post);
  }

  render() {
    const { post, clickHandler, selected } = this.props;

    if(!post)
      return;

    const buttons = [];
    if(post.id)
      buttons.push( {iconUri: pencil, href: `#/edit/${post.id}`, name: 'Edit'} );

    let className = 'posts_listblock';
    if(selected)
      className += ' selected';

    return (
      <a onClick={this.onBlockClick}>
        <li className={className}>
          {post.name}
          <ListBlockButtons buttons={buttons} />
        </li>
      </a>
    );
  }
};

ListBlock.propTypes = {
  post: PropTypes.object,
  clickHandler: PropTypes.func,
};

export default ListBlock;
