
import React from 'react';
import PropTypes from 'prop-types';

class RenderedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '<p>Rendering...</p>'
    }
  }

  componentDidMount() {
    this.renderItem(this.props.item);
  }

  componentDidUpdate(prevProps) {
    // questionable condition....?
    if(prevProps.item !== this.props.item)
      this.renderItem(this.props.item);
  }

  renderItem(item) {
    if(!item)
      return this.setState({content: `<p>no item to render</p>`});

    let content;
    if(item.rendered)
      content = item.rendered;
    else if(item.render)
      content = item.render(item);
    else
    {
      content = '<h1>unable to render that item</h1>' +
        `<pre>${JSON.stringify(item, undefined, 2)}</pre>`;
    }
    this.setState({ content });
  }

  render() {
    const { className, id } = this.props;
    return (
      <div id={id} className={className}
        dangerouslySetInnerHTML={{__html: this.state.content}}
      />
    );
  }
}

RenderedView.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default RenderedView;
