import React from 'react';
import './NavigationBlock.css';

const NavigationBlock = ({ navigationData, onCategorySelect }) => {
  return (
    <nav className="navigation-block">
    {navigationData.map((category, index) => (
      <div
        key={index}
        onClick={() => onCategorySelect(category)}
        className="category-item"
      >
        {category}
      </div>
    ))}
  </nav>
);
};

export default NavigationBlock;
