
import React from 'react';
import PropTypes from 'prop-types';
import ListBlockButton from './ListBlockButton';

class ListBlockButtons extends React.PureComponent {
  render() {
    const { buttons } = this.props;

    if(!buttons) return;

    const blockButtons = buttons.map((button, key) => (
      <ListBlockButton key={key} {...button} />
    ));

    return (
      <div className='listBlockButtons'>
        { blockButtons.length > 0 && blockButtons }
      </div>
    );
  }
}

ListBlockButtons.propTypes = {
  buttons: PropTypes.array,
};

export default ListBlockButtons;
