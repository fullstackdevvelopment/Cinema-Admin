import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import vector from '../../assets/icons/vector.svg';
import errorImg from '../../assets/images/userError.webp';
import { adminData } from '../../store/actions/adminData';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const data = useSelector((state) => state.adminData.admin);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setAnchorEl(null);
    navigate('/signIn');
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      dispatch(adminData());
    }
  }, [dispatch, token]);

  return (
    <div className="header">
      <div className="container">
        <nav className="header__nav">
          <figure className="header__nav__logo">
            <img
              src={logo}
              alt="logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = errorImg;
              }}
            />
          </figure>
          <div className="header__nav__icon">
            <img
              className="admin__photo"
              src={`http://localhost:4000/${data?.photo}`}
              alt="Admin"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = errorImg;
              }}
            />
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <img
                className="vector"
                src={vector}
                alt="Vector"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = errorImg;
                }}
              />
            </Button>
          </div>
        </nav>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className="header__menu"
      >
        {token ? (
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        ) : (
          <MenuItem onClick={() => navigate('/signIn')}>Sign In</MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default Header;
