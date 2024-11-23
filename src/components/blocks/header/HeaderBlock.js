import './HeaderBlock.css';
import React, { useState } from 'react';
import LogoElement from '../../elements/logo/LogoElement';
import InputElement from '../../elements/input/InputElement';
import ButtonElement from '../../elements/button/ButtonElement';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart  } from '@fortawesome/free-solid-svg-icons';

function HeaderBlock() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, name, handleLogout } = useAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="header-block">
      <LogoElement />
      <InputElement
        className="search-box"
        placeholder="Search products..."
        onChange={handleSearchChange}
        value={searchQuery}
      />
      <div className="header-buttons">
        <ButtonElement onClick={handleCartClick}>
           <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />Cart
        </ButtonElement>
        {user ? (
          <div 
            className="profile-menu"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
        <ButtonElement >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />{name}
        </ButtonElement>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <a href="/profile">Profile</a>
                <a href="/" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        ) : (
          <ButtonElement onClick={handleLoginClick}>Login</ButtonElement>
        )}
      </div>
    </header>
  );
}

export default HeaderBlock;
