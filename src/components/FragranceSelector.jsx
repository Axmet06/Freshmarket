import React from 'react';
import '../styles/fragrance-selector.css';

const FragranceSelector = () => {
  const fragranceTypes = [
    { id: 1, name: 'Свежие', icon: '🍃' },
    { id: 2, name: 'Восточные', icon: '🏜️' },
    { id: 3, name: 'Цветочные', icon: '🌸' }
  ];

  return (
    <div className="fragrance-selector">
      <h2 className="section-title">Подбор аромата</h2>
      <div className="fragrance-buttons">
        {fragranceTypes.map(type => (
          <button key={type.id} className="fragrance-btn glass">
            <span className="fragrance-icon">{type.icon}</span>
            <span className="fragrance-name">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FragranceSelector;