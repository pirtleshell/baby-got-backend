
import React from 'react';
import PropTypes from 'prop-types';

import ListBlock from './ListBlock';

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, onPostClick, selectedKey } = this.props;

    return (
      <ul id='posts_list'>
        {posts && posts.map((post, i) => {
          const key = post.key ? post.key : i;
          return (
            <ListBlock
              key={key}
              post={post}
              clickHandler={onPostClick}
              selected={selectedKey === key}
            />
        )})}
      </ul>
    );
  }
};

PostList.propTypes = {
  items: PropTypes.array
};

export default PostList;
