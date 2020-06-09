import React from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import RenderedView from '../RenderedView';

import Api from '../../api';
const api = new Api();

const setItemKey = (item, i) => {
  item.key = i;
  return item;
};

class ListViewer extends React.Component {
  constructor(props) {
    super(props);

    let items = Array.isArray(props.items) ? props.items : [];

    this.changeContent = this.changeContent.bind(this);
    this.fetchMore = this.fetchMore.bind(this);
    this.watchLeftRight = this.watchLeftRight.bind(this);
    this.state = {
      items: items.map(setItemKey),
      currentItem: {key: -1, rendered: 'welcome!'},
    }
  }

  componentDidMount() {
    console.log('added!')
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
        items: prevState.items.concat(posts).map(setItemKey)
      }))
    });
  }

  changeContent(item) {
    console.log('changing content!', item)
    this.setState({ currentItem: item });
  }

  watchLeftRight(e) {
    let right = e.keyCode === 39;
    let left = e.keyCode === 37;
    console.log(left, right)
    console.log(e)
    if(left || right) {
      // find current page index
      const currIndex = this.state.items.map(item => item.key).indexOf(this.state.currentItem.key);
      const extra = right ? 1 : -1;
      let newPageIndex = currIndex + extra;

      if(newPageIndex >= this.state.items.length)
        newPageIndex = 0;
      else if(newPageIndex < 0)
        newPageIndex = this.state.items.length - 1;

      const newItem = this.state.items[newPageIndex];
      this.changeContent(newItem);
    }
  }

  render() {
    const { itemName } = this.props;

    return (
          <div id='posts'>
            <ItemList
              className='posts_list'
              itemName={itemName}
              items={this.state.items}
              onItemClick={this.changeContent}
              selectedKey={this.state.currentItem.key}
              fetchMore={this.fetchMore}
            />
            <div className='post_display'>
              <RenderedView item={this.state.currentItem} />
            </div>
          </div>
    );
  }
}

ListViewer.propTypes = {
  itemName: PropTypes.string,
};

ListViewer.defaultProps = {
  itemName: 'Item',
};

export default ListViewer;
