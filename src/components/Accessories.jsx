import React from 'react';
import '../styles/accessories.css';

const Accessories = () => {
  const accessories = [
    {
      id: 1,
      name: 'Сумка-холодильник',
      brand: 'CoolBag',
      image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 390,
      description: 'Для сохранения свежести продуктов'
    },
    {
      id: 2,
      name: 'Контейнеры для хранения',
      brand: 'FoodSafe',
      image: 'https://images.unsplash.com/photo-1604186264148-9e761d719580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 260,
      description: 'Набор герметичных контейнеров'
    },
    {
      id: 3,
      name: 'Термос 1 литр',
      brand: 'ThermoPro',
      image: 'https://images.unsplash.com/photo-1591353842971-9ac335aabfab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 870,
      description: 'Сохраняет температуру до 24 часов'
    },
    {
      id: 4,
      name: 'Набор для завтрака',
      brand: 'MorningFresh',
      image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 1300,
      description: 'Кружка, ложка, вилка, салфетница'
    },
    {
      id: 5,
      name: 'Повторно используемый пакет',
      brand: 'EcoLife',
      image: 'https://images.unsplash.com/photo-1604186264148-9e761d719580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 170,
      description: 'Экологичная альтернатива пластику'
    },
    {
      id: 6,
      name: 'Подставка для фруктов',
      brand: 'KitchenStyle',
      image: 'https://images.unsplash.com/photo-1591353842971-9ac335aabfab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 430,
      description: 'Деревянная подставка для хранения'
    }
  ];

  return (
    <div className="accessories-section">
      <div className="container">
        <h2 className="section-title">Аксессуары</h2>
        <div className="products-grid grid">
          {accessories.map(accessory => (
            <div key={accessory.id} className="product-card glass fade-in">
              <div className="product-image">
                <img src={accessory.image} alt={accessory.name} />
              </div>
              <div className="product-info">
                <h3>{accessory.name}</h3>
                <p className="brand">{accessory.brand}</p>
                <p className="description">{accessory.description}</p>
                <div className="price-container">
                  <div className="price">{accessory.price} сом</div>
                  <button className="btn btn-card">Добавить в корзину</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;