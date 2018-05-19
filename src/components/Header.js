
import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div id='app_header'>
        <div className='headerMenu'>
          <NavLink to='/' className='headerMenuLink'>Home</NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
