import { useState, useEffect } from 'react';

import '../styles/brands.css';
import { fetchGroceryCategories } from '../services/groceryApi';

const Brands = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await fetchGroceryCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Ошибка загрузки категорий');
        console.error('Ошибка загрузки категорий:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="brands-page">
        <div className="container">
          <h1 className="section-title">Категории</h1>
          <div className="loading">Загрузка категорий...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="brands-page">
        <div className="container">
          <h1 className="section-title">Категории</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="brands-page">
      <div className="container">
        <h1 className="section-title">Категории</h1>
        <div className="brands-grid grid">
          {categories.map((category, index) => (
            <div key={category.slug} className="brand-card glass">
              <div className="brand-info">
                <h3>{category.name}</h3>
                <p>{category.slug}</p>
                <button 
                  className="btn-card-brand"
                  onClick={() => window.location.href=`#/catalog?category=${category.slug}`}
                >
                  Посмотреть товары
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;