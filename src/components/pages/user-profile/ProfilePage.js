import React from 'react';
import { useAuth } from '../../../context/AuthContext'; 
import ButtonElement from '../../elements/button/ButtonElement';
import './ProfilePage.css'; 

const ProfilePage = () => {
  const { user, name, handleLogout } = useAuth();

  return (
    <div className="container">
      <div className='profile-card'>
      <h3>Profile</h3>
      {user ? (
        <div>
          <p className="welcome-message">Hello, {name}</p>
          <ButtonElement className="logout-button" onClick={handleLogout}>Logout</ButtonElement>
        </div> 
      ) : (
        <p>You are not logged in.</p>
      )}
      </div>
    </div>
  );
};

export default ProfilePage;
