import React from 'react';
import '../styles/fragrance-selector.css';

const ProductTypeSelector = () => {
  const productTypes = [
    { id: 1, name: 'Овощи', icon: '🥕' },
    { id: 2, name: 'Фрукты', icon: '🍎' },
    { id: 3, name: 'Молочные', icon: '🥛' }
  ];

  return (
    <div className="fragrance-selector">
      <h2 className="section-title">Подбор по типу</h2>
      <div className="fragrance-buttons">
        {productTypes.map(type => (
          <button key={type.id} className="fragrance-btn glass">
            <span className="fragrance-icon">{type.icon}</span>
            <span className="fragrance-name">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTypeSelector;