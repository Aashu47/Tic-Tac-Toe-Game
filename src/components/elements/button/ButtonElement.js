import React from 'react';
import './ButtonElement.css'; 

function ButtonElement({ children, onClick, className = '' }) {
  return (
    <button className={`button-element ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonElement;
