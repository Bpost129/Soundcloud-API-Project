import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
    <div id="profile-menu">
      <div id="profile-menu-housing" onClick={openMenu}>
        
        <div id="profile-button" >
          {user.imageUrl ? <img alt='userPreviewPic' id="userPreviewPic" src={user.imageUrl} style={{marginRight:"3px", height:"25px", width:"28px", borderRadius:"14px"}}></img> : <i className="fas fa-user-circle" /> }
          <div className="profile-hover">
            <div style={{marginRight:"0px", marginLeft: "3px"}}>{user.username}</div>
            {/* <i style={{marginLeft:"0px"}} className="fa-duotone fa-angle-down"></i> */}
          </div>
        </div>
        
      </div>
        
      {showMenu && (
        <div className="profile-dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button id="logoutButton" onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
      
    </>
  );
}

export default ProfileButton;