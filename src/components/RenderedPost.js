
import React from 'react';
import PropTypes from 'prop-types';

class RenderedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '<p>Rendering...</p>'
    }
  }

  componentDidMount() {
    console.log('mounted')
    this.renderPost(this.props.post);
  }

  componentDidUpdate(prevProps) {
    console.log('updated')
    // questionable condition....?
    if(prevProps.post !== this.props.post)
      this.renderPost(this.props.post);
  }

  renderPost(post) {
    if(!post)
      return this.setState({content: `<p>no post to render</p>`});

    let content;
    if(post.rendered)
      content = post.rendered;
    else if(post.render)
      content = post.render(post);
    else
    {
      content = '<h1>unable to render that post</h1>' +
        `<pre>${JSON.stringify(post, undefined, 2)}</pre>`;
    }
    this.setState({ content });
  }

  render() {
    const { className, id } = this.props;
    console.log(this.props.post)
    return (
      <div id={id} className={className}
        dangerouslySetInnerHTML={{__html: this.state.content}}
      />
    );
  }
}

RenderedPost.propTypes = {
  post: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default RenderedPost;
