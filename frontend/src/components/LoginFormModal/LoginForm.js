import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return (
//     <Redirect to="/" />
//   );

  // useEffect for validation errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoSubmit = (e) => {
    setCredential('DemoUser');
    setPassword('password');
    return dispatch(sessionActions.login({credential, password}))
  }

  return ( 
    <div>
      <h2 id="loginHeader">Log In</h2>
    <form id="loginForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div id="loginButtons">
        <button type="submit" id="demoUserButton" onClick={demoSubmit}>Demo User</button>
        <button type="submit" id="loginSubmitButton">Log In</button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;