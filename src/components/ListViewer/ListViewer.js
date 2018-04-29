
import React from 'react';
import PostList from './PostList';
import RenderedPost from '../RenderedPost';

import Api from '../../api';
const api = new Api();

// test data
import dummyPosts from '../../../test/dummyPosts';

const keyPosts = (item, i) => {item.key = i; return item};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeContent = this.changeContent.bind(this);
    this.fetchMore = this.fetchMore.bind(this);
    this.watchLeftRight = this.watchLeftRight.bind(this);
    this.state = {
      items: dummyPosts.map(keyPosts),
      currentPost: {key: -1, rendered: 'welcome!'},
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.watchLeftRight);
    this.fetchMore();
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.watchLeftRight);
  }

  fetchMore() {
    console.log('fetching more posts');
    api.get('/posts').then(posts => {
      this.setState(prevState => ({
        items: prevState.items.concat(posts).map(keyPosts)
      }))
    });
  }

  changeContent(post) {
    console.log('changing content!')
    this.setState({ currentPost: post });
  }

  watchLeftRight(e) {
    let right = e.keyCode === 39;
    let left = e.keyCode === 37;
    if(left || right)
    {
      // find current page index
      const currIndex = this.state.items.map(item => item.key).indexOf(this.state.currentPost.key);
      const extra = right ? 1 : -1;
      let newPageIndex = currIndex + extra;

      if(newPageIndex >= this.state.items.length)
        newPageIndex = 0;
      else if(newPageIndex < 0)
        newPageIndex = this.state.items.length - 1;

      const newPost = this.state.items[newPageIndex];
      this.changeContent(newPost);
    }
  }

  render() {
    const { children } = this.props;

    return (
          <div id='posts'>
            <PostList
              posts={this.state.items}
              onPostClick={this.changeContent}
              selectedKey={this.state.currentPost.key}
              fetchMore={this.fetchMore}
            />
            <RenderedPost
              id='post_display'
              post={this.state.currentPost}
            />
          </div>
    );
  }
}

export default App;
