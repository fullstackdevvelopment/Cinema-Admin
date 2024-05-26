import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { AiOutlineInstagram, AiOutlineChrome } from 'react-icons/ai';
import { LiaFacebook } from 'react-icons/lia';
import { TiSocialTwitterCircular } from 'react-icons/ti';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__block">
          <div className="footer__row">
            <div className="footer__logo">
              <p>F</p>
              <p>movie</p>
            </div>
            <div className="footer__copy">
              <p>Copyright</p>
              <FaRegCopyright />
              <p>2023Fmovie. Cinema</p>
            </div>
          </div>
          <div className="footer__row">
            <div className="footer__menu">
              <div className="footer__menu__link">
                <h3>About</h3>
                <NavLink to="#">Home</NavLink>
                <NavLink to="#">Catalog</NavLink>
                <NavLink to="#">Profile</NavLink>
              </div>
              <div className="footer__menu__link">
                <h3>Menu</h3>
                <NavLink to="#">Latest</NavLink>
                <NavLink to="#">Coming Soon</NavLink>
                <NavLink to="#">Featured movies</NavLink>
              </div>
              <div className="footer__menu__icon">
                <h3>Follow Us</h3>
                <div className="footer__menu__icon__block">
                  <LiaFacebook />
                </div>
                <div className="footer__menu__icon__block">
                  <AiOutlineInstagram />
                </div>
                <div className="footer__menu__icon__block">
                  <TiSocialTwitterCircular />
                </div>
                <div className="footer__menu__icon__block">
                  <AiOutlineChrome />
                </div>
              </div>
            </div>
          </div>
          <div className="footer__row">
            <div className="footer__contact">5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
