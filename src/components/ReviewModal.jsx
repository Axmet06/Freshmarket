// ReviewModal.jsx
import { memo, useState, useEffect } from 'react';
import '../styles/reviews.css';

const ReviewModal = memo(({ 
  show, 
  onClose, 
  onSubmit, 
  products, 
  initialData 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);

  // Обновляем локальное состояние при изменении initialData
  useEffect(() => {
    if (show) {
      setFormData(initialData);
    }
  }, [show, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content " onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Добавить отзыв</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Ваше имя *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Введите ваше имя"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="productId">Товар</label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              className="form-select"
            >
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Оценка</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`rating-star ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
              <span className="rating-text">
                {renderRating(formData.rating)}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Ваш отзыв *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Поделитесь вашими впечатлениями о товаре..."
              rows="4"
              required
              className="form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={submitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Отправить отзыв'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ReviewModal;