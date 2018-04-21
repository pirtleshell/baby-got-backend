
import React from 'react';
import PostList from './PostList';

// test data
import dummyPosts from '../../../test/dummyPosts';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeContent = this.changeContent.bind(this);
    this.state = {
      display: 'welcome!'
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
      display = 'unable to render that post';
    }
    this.setState({ display });
  }

  render() {
    const { children } = this.props;

    return (
          <div id='posts'>
            <PostList
              posts={dummyPosts}
              onPostClick={this.changeContent}
            />
            <div id='post_display'
              dangerouslySetInnerHTML={{__html: this.state.display}}
            />
          </div>
    );
  }
}

export default App;
