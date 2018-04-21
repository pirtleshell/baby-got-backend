
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
    const { post, clickHandler } = this.props;

    if(!post)
      return;

    return (
      <a onClick={this.onBlockClick}>
        <li className='posts_listblock'>
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
