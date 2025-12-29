import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reviews.css';
import { getReviews } from '../api/reviews';
import { fetchGroceries } from '../services/groceryApi';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all products
        const productsData = await fetchGroceries();
        setProducts(productsData);
        
        // Fetch all reviews (for product ID 1 as example, or you can fetch all)
        const reviewsData = await getReviews("1");
        setReviews(reviewsData);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Render star rating
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="container">
          <div className="loading">Загрузка отзывов...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="container">
        <h1 className="section-title">Отзывы покупателей</h1>
        
        <div className="reviews-content">
          <div className="reviews-list glass">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <h3>{review.username}</h3>
                    <div className="review-rating">
                      {renderRating(review.rating)}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-date">
                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-reviews">
                <p>Пока нет отзывов. Будьте первым!</p>
              </div>
            )}
          </div>
          
          <div className="products-preview">
            <h2>Популярные товары</h2>
            <div className="products-grid grid">
              {products.slice(0, 6).map(product => (
                <div key={product.id} className="product-preview">
                  <Link to={`/product/${product.id}`}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <h3>{product.name}</h3>
                    <p className="product-price">{product.price} сом</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;