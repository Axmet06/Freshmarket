import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FragranceSelector from '../components/FragranceSelector';
import Accessories from '../components/Accessories';
import CustomerReviews from '../components/CustomerReviews';
import ShopAdvantages from '../components/ShopAdvantages';
import '../styles/home.css';
import { fetchPerfumes } from '../services/perfumeApi';

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        const allPerfumes = await fetchPerfumes();
        
        const shuffled = [...allPerfumes].sort(() => 0.5 - Math.random());
        setBestSellers(shuffled.slice(0, 6));
        
        const lastProducts = allPerfumes.slice(-6);
        setNewArrivals(lastProducts);
      } catch (err) {
        setError(err.message);
        setBestSellers([]);
        setNewArrivals([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductWithNewLabel = (product) => {
    return { ...product, isNew: true };
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Загрузка товаров...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error">Ошибка загрузки: {error}</div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <h2>НОВАЯ КОЛЛЕКЦИЯ</h2>
            <h3>Сладкие ароматы лета</h3>
            <p>Откройте для себя новые волшебные ароматы, которые подарят вам уверенность и неповторимый шарм</p>
            <Link to="/catalog" className="btn btn-primary">
              Смотреть коллекцию
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Хиты продаж</h2>
          <div className="products-grid grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Новинки</h2>
          <div className="products-grid grid">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={getProductWithNewLabel(product)} 
              />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <FragranceSelector />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <Accessories />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <CustomerReviews />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <ShopAdvantages />
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content glass">
            <h2>Подарите себе волшебство ароматов</h2>
            <p>Откройте для себя эксклюзивные ароматы от ведущих мировых брендов</p>
            <Link to="/catalog" className="btn btn-secondary">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;