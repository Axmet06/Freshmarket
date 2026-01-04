import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductTypeSelector from '../components/FragranceSelector';
import Accessories from '../components/Accessories';
import CustomerReviews from '../components/CustomerReviews';
import ShopAdvantages from '../components/ShopAdvantages';
import '../styles/home.css';
import { fetchGroceries } from '../services/groceryApi';

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        const allProducts = await fetchGroceries();
        
        // Sort by rating for best sellers
        const sortedByRating = [...allProducts].sort((a, b) => b.rating - a.rating);
        setBestSellers(sortedByRating.slice(0, 6));
        
        // Sort by ID for new arrivals (higher IDs are newer)
        const sortedById = [...allProducts].sort((a, b) => b.id - a.id);
        setNewArrivals(sortedById.slice(0, 6));
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
            <h2>СВЕЖИЕ ПОСТУПЛЕНИЯ</h2>
            <h3>Органические продукты</h3>
            <p>Откройте для себя свежие и качественные продукты, которые подарят вам здоровье и энергию</p>
            <Link to="/catalog" className="btn btn-primary">
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Популярные товары</h2>
          <div className="products-flex-wrap">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Новинки</h2>
          <div className="products-flex-wrap">
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
          <ProductTypeSelector />
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
            <h2>Подарите себе свежесть и качество</h2>
            <p>Откройте для себя лучшие продукты от проверенных поставщиков</p>
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