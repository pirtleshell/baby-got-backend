
import React from 'react';
import PostList from './PostList';

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
      display: 'welcome!',
      items: dummyPosts.map(keyPosts),
      currentPost: {key: -1}
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.watchLeftRight);
    this.fetchMore();
  }

  fetchMore() {
    console.log('fetching more posts');
    fetch('http://localhost:3000/admin/api/posts').then(res => res.json())
      .then(data => {
        console.log(data);

        this.setState(prevState => ({
          items: prevState.items.concat(data.posts).map(keyPosts)
        }))
      })
  }

  changeContent(post) {
    console.log('changing content!')
    let display;
    if(post.rendered)
      display = post.rendered;
    else if(post.render)
      display = post.render(post);
    else
    {
      console.log('unable to render!')
      display = `<h1>unable to render that post<h1><pre>${JSON.stringify(post, 2)}</pre>`;
    }
    this.setState({ display, currentPost: post });
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
            <div id='post_display'
              dangerouslySetInnerHTML={{__html: this.state.display}}
            />
          </div>
    );
  }
}

export default App;
