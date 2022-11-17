import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from './images/soundwave.png';


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
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul id="navUl">
      <li>
        <div id="leftNav">
          { !sessionUser && <NavLink id='splashPageOut' exact to="/"><img alt='soundwave' src={logo} style={{height:"30px", width:"30px"}}></img></NavLink> }
          { sessionUser && <NavLink id='splashPageIn' exact to="/home"><img alt='soundwave' src={logo} style={{height:"30px", width:"30px"}}></img></NavLink> }       
            <NavLink id='homeLink' to="/home">Home</NavLink>
        </div>
        { sessionUser && <div id="rightNavIn">
          <NavLink id='uploadLink' to="/upload">Upload</NavLink>
          {isLoaded && sessionLinks}
        </div> }
        { !sessionUser && <div id="rightNavOut">
          <NavLink id='uploadLink' to="/upload">Upload</NavLink>
          {isLoaded && sessionLinks}
        </div>}
        
      </li>
    </ul>
  );
}

export default Navigation;