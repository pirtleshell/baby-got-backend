
import React from 'react';
import PropTypes from 'prop-types';

class ListBlockButton extends React.Component {
  render() {
    const { name, text, href, iconUri } = this.props;

    let content = (<div>{text}</div>);
    if(iconUri)
      content = (<img src={iconUri} alt={name} width={18} height={18} />);

    content =(<div className='listBlockButton'>{content}</div>);

    if(!href)
      return content;

    return (
      <a href={href}>
        { content }
      </a>
    );
  }
}

const requireEitherIconUriOrText = (props, propName, componentName) => {
  if(!props.text && !props.iconUri)
    return new Error(`Button ${componentName} has no text or iconUri prop.`);
}

ListBlockButton.propTypes = {
  iconUri: requireEitherIconUriOrText,
  text: requireEitherIconUriOrText,
};

export default ListBlockButton;
