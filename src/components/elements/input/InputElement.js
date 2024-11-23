import React from 'react';
import './InputElement.css';

function InputElement({ placeholder, onChange, className = '' }) {
  return (
    <input
      type="text"
      className={`input-element ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
    
  );
}

export default InputElement;
