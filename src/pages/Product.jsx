import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';
import '../styles/reviews.css';
import { fetchGroceries } from '../services/groceryApi';
import { getReviews, addReview, deleteReview } from '../api/reviews';
import { useCart } from '../context/CartContext';

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    username: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        // Fetch all products
        const products = await fetchGroceries();
        
        // Find the product with the matching ID
        const product = products.find(p => p.id === parseInt(id));
        
        if (!product) {
          throw new Error('Товар не найден');
        }
        
        setProductData(product);
        
        // Get similar products (first 3 products that are not the current product)
        const similar = products.filter(p => p.id !== product.id).slice(0, 3);
        setSimilarProducts(similar);
        
        // Load reviews for this product
        loadReviews(product.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [id]);

  const loadReviews = async (productId) => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);
      const reviewsData = await getReviews(productId.toString());
      setReviews(reviewsData);
    } catch (err) {
      setReviewsError(err.message || 'Не удалось загрузить отзывы');
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (productData) {
      addToCart(productData, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  // Handle review form changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit a new review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!productData) return;
    
    setSubmitting(true);
    try {
      const newReview = await addReview(
        productData.id.toString(),
        reviewForm.username,
        parseInt(reviewForm.rating),
        reviewForm.comment
      );
      
      // Add the new review to the list (at the beginning since we show newest first)
      setReviews(prev => [newReview, ...prev]);
      
      // Reset form
      setReviewForm({
        username: '',
        rating: 5,
        comment: ''
      });
    } catch (err) {
      setReviewsError(err.message || 'Не удалось отправить отзыв');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      // Remove the review from the list
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    } catch (err) {
      setReviewsError(err.message || 'Не удалось удалить отзыв');
    }
  };

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          {/* Skeleton Loader */}
          <div className="product-details">
            <div className="product-images skeleton-loader"></div>
            <div className="product-info">
              <div className="skeleton-loader skeleton-text" style={{width: '60%', height: '30px', marginBottom: '15px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '40%', height: '20px', marginBottom: '20px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '90%', height: '15px', marginBottom: '10px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '80%', height: '15px', marginBottom: '10px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '85%', height: '15px', marginBottom: '25px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '50%', height: '40px', marginBottom: '25px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '30%', height: '20px', marginBottom: '15px'}}></div>
              <div className="skeleton-loader skeleton-text" style={{width: '40%', height: '20px', marginBottom: '25px'}}></div>
              <div className="product-actions">
                <div className="skeleton-loader" style={{width: '120px', height: '40px', borderRadius: '30px'}}></div>
                <div className="skeleton-loader" style={{flex: 1, height: '40px', borderRadius: '30px'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="error">Ошибка: {error}</div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="error">Товар не найден</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="container">
        {/* Product Details Section */}
        <div className="product-details">
          <div className="product-images">
            <img 
              src={productData.image} 
              alt={productData.name}
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{productData.name}</h1>
            <p className="product-brand">{productData.brand}</p>
            
            <div className="product-meta">
              <p><strong>Рейтинг:</strong> 
                <span className="rating-value">
                  {productData.rating} 
                  <span className="stars">
                    {'★'.repeat(Math.floor(productData.rating))}
                    {'☆'.repeat(5 - Math.floor(productData.rating))}
                  </span>
                </span>
              </p>
              <p><strong>В наличии:</strong> {productData.stock > 0 ? `${productData.stock} шт.` : 'Нет в наличии'}</p>
            </div>
            
            <div className="product-price">
              {productData.price}
            </div>
            
            <p className="product-description">{productData.description}</p>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? 'Добавлено!' : 'Добавить в корзину'}
              </button>
              
              {addedToCart && (
                <div className="cart-notification">
                  Товар добавлен в корзину!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Characteristics Section */}
        <div className="characteristics-section">
          <h2>Характеристики</h2>
          <div className="characteristics-grid">
            <div className="characteristic-item">
              <strong>Бренд:</strong>
              <span>{productData.brand}</span>
            </div>
            <div className="characteristic-item">
              <strong>Категория:</strong>
              <span>{productData.category}</span>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <h2>Похожие продукты</h2>
            <div className="products-grid">
              {similarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Отзывы о товаре</h2>
          
          {/* Reviews List */}
          {reviewsLoading ? (
            <div className="loading">Загрузка отзывов...</div>
          ) : reviewsError ? (
            <div className="error">{reviewsError}</div>
          ) : reviews.length === 0 ? (
            <div className="no-reviews">Пока нет отзывов. Будьте первым!</div>
          ) : (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-name">{review.username}</div>
                    <div className="review-date">
                      {new Date(review.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderRating(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <button 
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Удалить отзыв
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Review Form */}
          <div className="add-review-section">
            <h3>Оставить отзыв</h3>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="username">Ваше имя:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={reviewForm.username}
                  onChange={handleReviewChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rating">Рейтинг:</label>
                <select
                  id="rating"
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewChange}
                  className="rating-select"
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 5 ? 'звёзд' : num > 1 ? 'звезды' : 'звезда'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Комментарий:</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleReviewChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Отправка...' : 'Отправить отзыв'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;