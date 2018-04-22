
import React from 'react';
import PropTypes from 'prop-types';

class ListBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onBlockClick = this.onBlockClick.bind(this);
  }

  onBlockClick(event) {
    console.log('block clicked!')

    if(this.props.clickHandler)
      this.props.clickHandler(this.props.post);
  }

  render() {
    const { post, clickHandler, selected } = this.props;

    if(!post)
      return;

    let className = 'posts_listblock';
    if(selected)
      className += ' selected';

    return (
      <a onClick={this.onBlockClick}>
        <li className={className}>
          {post.name}
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
