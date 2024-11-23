import React from 'react';
import './LogoElement.css';

function LogoElement() {
  return (
    <div className="logo-element">
      <img src={`${process.env.PUBLIC_URL}/assets/logo2.png`} alt="Logo" />
    </div>
  );
}

export default LogoElement;
