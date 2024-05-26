import React from 'react';
import logo from '../../assets/images/logo.svg';
import adminIcon from '../../assets/icons/adminIcon.svg';
import vector from '../../assets/icons/vector.svg';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <nav className="header__nav">
          <figure className="header__nav__logo">
            <img src={logo} alt="logo" />
          </figure>
          <div className="header__nav__icon">
            <img src={adminIcon} alt="Admin" />
            <img src={vector} alt="Vector" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
