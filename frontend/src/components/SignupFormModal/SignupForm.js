import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const history = useHistory();
//   const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  // useEffect for validation errors
  useEffect(() => {
    const errs = [];

    if (!email) {
      errs.push("Email cannot be empty")
    } else if (!email.includes('@') && !email.includes('.')) {
      errs.push("Must enter a valid email")
    }

    if (!username){
      errs.push("Username cannot be empty")
    } else if (username.length < 4) {
      errs.push("Username must be at least 4 characters")
    } else if (username.length > 30) {
      errs.push("Username must be less than 30 characters")
    }

    if (!firstName) {
      errs.push("First name cannot be empty")
    } else if (firstName.length < 2) {
      errs.push("First name must be at least 2 characters")
    } else if (firstName.length > 30) {
      errs.push("First name must be less than 30 characters")
    }

    if (!lastName) {
      errs.push("Last name cannot be empty")
    } else if (lastName.length < 3) {
      errs.push("Last name must be at least 3 characters")
    } else if (lastName.length > 30) {
      errs.push("Last name must be less than 30 characters")
    }

    


    
    setErrors(errs);
  }, [email, username, firstName, lastName])

  // handle submit for signup (dispatch thunk with new entry)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      history.push("/home")
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
      <h2 id="signupHeader">Sign Up</h2>
    <form id="signupForm" onSubmit={handleSubmit}>
      <ul style={{color: 'red'}}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" id="signupSubmitButton">Sign Up</button>
    </form>
    </div>
    
  );
}

export default SignupForm;