import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to ="/login">Log in</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul id="navUl">
      <li>
        <NavLink id='homeLink' exact to="/">Home</NavLink>
        <NavLink id='uploadLink' to="/upload">Upload</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;