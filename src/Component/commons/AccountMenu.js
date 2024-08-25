import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AccountMenu() {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [iconClass, setIconClass] = useState('');
  const handleClick = (event) => {
    setIconClass('normal');
    setAnchorEl(event.currentTarget);
    setIconClass('rotate');
  };
  const handleClose = () => {
    setIconClass('rotate');
    setAnchorEl(null);
    setIconClass('normal');
  };
  const handleDashboard = useCallback(() => {
    navigate('/dashboard/all');
  }, []);

  const handleMovieList = useCallback(() => {
    navigate('/movie/list');
  }, []);

  const handleUser = useCallback(() => {
    navigate('/user');
  }, []);

  const handleReview = useCallback(() => {
    navigate('/review');
  }, []);

  const handleScheduleList = useCallback(() => {
    navigate('/schedule/list');
  }, []);

  const handleLogout = () => {
    if (token) {
      sessionStorage.removeItem('token');
      setToken(null);
      setAnchorEl(null);
      navigate('/signIn');
      window.location.reload();
    }
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{
            width: 32,
            height: 32,
          }}
          >
            <MenuIcon className={iconClass} />
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />
          {' '}
          Admin
        </MenuItem>
        <CloseIcon
          onClick={handleClose}
          className="close"
        />
        <Divider />
        <MenuItem
          className={pathname === '/dashboard/all' ? 'active' : ''}
          onClick={handleDashboard}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          DASHBOARD
        </MenuItem>
        <MenuItem
          className={pathname === '/movie/list' ? 'active' : ''}
          onClick={handleMovieList}
        >
          <ListItemIcon>
            <MovieIcon fontSize="small" />
          </ListItemIcon>
          MOVIE LIST
        </MenuItem>
        <MenuItem
          className={pathname === '/user' ? 'active' : ''}
          onClick={handleUser}
        >
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          USERS LIST
        </MenuItem>
        <MenuItem
          className={pathname === '/review' ? 'active' : ''}
          onClick={handleReview}
        >
          <ListItemIcon>
            <ReviewsIcon fontSize="small" />
          </ListItemIcon>
          REVIEW LIST
        </MenuItem>
        <MenuItem
          className={pathname === '/schedule/list' ? 'active' : ''}
          onClick={handleScheduleList}
        >
          <ListItemIcon>
            <DateRangeIcon fontSize="small" />
          </ListItemIcon>
          SCHEDULE
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
