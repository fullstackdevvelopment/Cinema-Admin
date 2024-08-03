import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { signIn } from '../store/actions/signIn';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.signIn.admin);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { token } = adminData || {};
  const adminToken = sessionStorage.getItem('token');
  const [errorMessage, setErrorMessage] = useState(null);

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
  }, [token, adminToken, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const signInResult = await dispatch(signIn({
        userName,
        password,
      }));
      if (signIn.fulfilled.match(signInResult)) {
        console.log(signInResult);
      } else {
        setErrorMessage(signInResult.payload.message);
      }
      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.error(e);
    }
  }, [userName, password, dispatch]);

  return (
    <div className="sign__in">
      <div className="sign__in__page">
        <div className="sign__in__page__title">
          <h1>Cinema Administration</h1>
          <h2>Sign In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className={errorMessage ? 'error' : ''}
            placeholder="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className={errorMessage ? 'error' : ''}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <span className="error__message">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              {errorMessage}
            </span>
          )}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
