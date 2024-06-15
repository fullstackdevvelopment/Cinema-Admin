import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../store/actions/signIn';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.signIn.admin);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { token } = adminData || {};
  const adminToken = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
      window.location.reload();
      sessionStorage.setItem('token', token);
    }
    if (adminToken) {
      navigate('/dashboard');
      window.location.reload();
    }
  }, [token, adminToken]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(signIn({
      userName,
      password,
    }));
  }, [userName, password]);

  return (
    <div className="sign__in">
      <div className="sign__in__page">
        <div className="sign__in__page__title">
          <h1>Cinema Administration</h1>
          <h2>Sign In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
