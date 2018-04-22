
import React from 'react';
import PostList from './PostList';

// test data
import dummyPosts from '../../../test/dummyPosts';

const keyPosts = (item, i) => {item.key = i; return item};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeContent = this.changeContent.bind(this);
    this.state = {
      display: 'welcome!',
      items: dummyPosts.map(keyPosts),
      currentPost: {key: -1}
    }
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
      display = `<h1>unable to render that post<h1><pre>${JSON.stringify(post, undefined, 2)}</pre>`;
    }
    this.setState({ display, currentPost: post });
  }

  render() {
    const { children } = this.props;

    return (
          <div id='posts'>
            <PostList
              posts={this.state.items}
              onPostClick={this.changeContent}
              selectedKey={this.state.currentPost.key}
            />
            <div id='post_display'
              dangerouslySetInnerHTML={{__html: this.state.display}}
            />
          </div>
    );
  }
}

export default App;
