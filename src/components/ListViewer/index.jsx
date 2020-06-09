import React from 'react';
import ItemList from './ItemList';
import RenderedView from '../RenderedView';

import Api from '../../api';
const api = new Api();

const setItemKey = (item, i) => {
  item.key = i;
  return item;
};

const ListViewer = ({ itemName = 'Item' }) => {
  const [posts, setPosts] = React.useState([]);
  const [post, setPost] = React.useState({
    key: -1,
    rendered: 'welcome!',
  });

  const watchLeftRight = React.useCallback((event) => {
    const right = event.key === 'ArrowRight';
    const left = event.key === 'ArrowLeft';
    if (left || right) {
      setPost((prevPost) => {
        const currIndex = posts.findIndex((item) => item.key === prevPost.key);
        const extra = right ? 1 : -1;
        const newPageIndex = currIndex + extra;
        return posts[newPageIndex % posts.length];
      });
    }
  }, [posts]);

  React.useEffect(() => {
    console.log('fetching posts!');
    api.get('/posts').then((newPosts) => {
      setPosts((prevPosts) => prevPosts.concat(newPosts).map(setItemKey));
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', watchLeftRight);
    return () => window.removeEventListener('keydown', watchLeftRight);
  }, [watchLeftRight]);

  return (
    <div id="posts">
      <ItemList
        className="posts_list"
        itemName={itemName}
        items={posts}
        onItemClick={(p) => setPost(p)}
        selectedKey={post.key}
        // fetchMore={this.fetchMore}
      />
      <div className="post_display">
        <RenderedView item={post} />
      </div>
    </div>
  );
};

export default ListViewer;
