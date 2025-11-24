import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reviews.css';
import { getReviews } from '../api/reviews';
import { fetchPerfumes } from '../services/perfumeApi';

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
        const productsData = await fetchPerfumes();
        setProducts(productsData);
        
        // Fetch all reviews (for product ID 1 as example, or you can fetch all)
        const reviewsData = await getReviews("1");
        setReviews(reviewsData);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Error loading data:', err);
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
        <h1 className="section-title">Все отзывы</h1>
        
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>Пока нет отзывов.</p>
            <Link to="/catalog" className="btn btn-primary">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => {
              // Find the product for this review
              const product = products.find(p => p.id.toString() === review.product_id);
              
              return (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-name">{review.username}</div>
                    <div className="review-date">
                      {new Date(review.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  
                  {product && (
                    <div className="review-product">
                      <Link to={`/product/${product.id}`}>
                        <h3>{product.name} от {product.brand}</h3>
                      </Link>
                    </div>
                  )}
                  
                  <div className="review-rating">
                    {renderRating(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;