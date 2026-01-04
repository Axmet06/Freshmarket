import { useState, useEffect, useCallback } from 'react';
import '../styles/reviews.css';
import { getReviews, addReview } from '../api/reviews';
import { fetchGroceries } from '../services/groceryApi';
import ReviewModal from '../components/ReviewModal';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Состояния для модального окна
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    username: '',
    rating: 5,
    comment: '',
    productId: '1'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const productsData = await fetchGroceries();
        setProducts(productsData);
        
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

  // Мемоизируем функцию рендеринга рейтинга
  const renderRating = useCallback((rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }, []);

  // Обработчик изменения полей формы - исправленная версия
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  }, []);

  // Обработчик изменения рейтинга
  const handleRatingChange = useCallback((rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  }, []);

  // Обработчик отправки отзыва
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.username.trim() || !newReview.comment.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      setSubmitting(true);
      
      const reviewToSend = {
        username: newReview.username,
        rating: newReview.rating,
        comment: newReview.comment,
        product_id: newReview.productId,
        created_at: new Date().toISOString()
      };

      const addedReview = await addReview(reviewToSend);
      setReviews(prev => [addedReview, ...prev]);
      
      handleCloseModal();
      alert('Спасибо за ваш отзыв!');
    } catch (err) {
      console.error('Ошибка при добавлении отзыва:', err);
      alert('Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  // Обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    // Не сбрасываем сразу, а только после анимации закрытия
    setTimeout(() => {
      setNewReview({
        username: '',
        rating: 5,
        comment: '',
        productId: '1'
      });
    }, 300);
  }, []);

  // Обработчик открытия модального окна
  const handleOpenModal = () => {
    setShowModal(!showModal);
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
        <div className="reviews-header">
          <h1 className="section-title">Отзывы покупателей</h1>
          <button className="add-review-btn" onClick={handleOpenModal}>
            + Добавить отзыв
          </button>
        </div>
        
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
                  <div className="review-meta">
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString('ru-RU')}
                    </span>
                    {review.product && (
                      <span className="review-product">
                        Товар: {review.product.name}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-reviews">
                <p>Пока нет отзывов. Будьте первым!</p>
                <button className="btn-primary" onClick={handleOpenModal}>
                  Написать отзыв
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Рендерим модальное окно */}
      {showModal && <ReviewModal onClose={handleCloseModal} onSubmit={handleSubmitReview} products={products} initialData={newReview} show={showModal} />}
    </div>
  );
};

export default Reviews;