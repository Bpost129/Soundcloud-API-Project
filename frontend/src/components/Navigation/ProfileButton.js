import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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
  };

  return (
    <>
    <div id="profile-menu">
      <div id="profile-menu-housing" onClick={openMenu}>
        
        <div id="profile-button" >
          {user.imageUrl ? <img alt='userPreviewPic' src={user.imageUrl} style={{marginRight:"3px", height:"25px", width:"25px", borderRadius:"12px"}}></img> : <i className="fas fa-user-circle" /> }
          <div className="profile-hover">
            <div style={{marginRight:"0px"}}>{user.username}</div>
            {/* <i style={{marginLeft:"0px"}} className="fa-duotone fa-angle-down"></i> */}
          </div>
        </div>
        
      </div>
        
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
      
    </>
  );
}

export default ProfileButton;