import React from 'react';
import '../styles/shop-advantages.css';

const ShopAdvantages = () => {
  const advantages = [
    {
      id: 1,
      title: 'Быстрая доставка',
      description: 'Доставим в течение 1-2 дней по всей России',
      icon: '🚚'
    },
    {
      id: 2,
      title: '100% оригиналы',
      description: 'Только оригинальная продукция с гарантией',
      icon: '✅'
    },
    {
      id: 3,
      title: 'Лучшие цены',
      description: 'Цены напрямую от производителей без наценок',
      icon: '💰'
    },
    {
      id: 4,
      title: 'Подарочные наборы',
      description: 'Создадим уникальные подарки для ваших близких',
      icon: '🎁'
    }
  ];

  return (
    <div className="advantages-section">
      <div className="container">
        <h2 className="section-title">Преимущества магазина</h2>
        <div className="advantages-grid">
          {advantages.map(advantage => (
            <div key={advantage.id} className="advantage-card glass fade-in">
              <div className="advantage-icon">{advantage.icon}</div>
              <h3 className="advantage-title">{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopAdvantages;