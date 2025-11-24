import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';
import '../styles/reviews.css';
import { fetchPerfumes } from '../services/perfumeApi';
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
        const products = await fetchPerfumes();
        
        // Find the product with the matching ID
        const product = products.find(p => p.id === parseInt(id));
        
        if (!product) {
          throw new Error('Product not found');
        }
        
        setProductData(product);
        
        // Get similar products (first 3 products that are not the current product)
        const similar = products.filter(p => p.id !== product.id).slice(0, 3);
        setSimilarProducts(similar);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProductData();
    }
  }, [id]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!productData) return;
      
      try {
        setReviewsLoading(true);
        setReviewsError(null);
        const data = await getReviews(productData.id.toString());
        setReviews(data);
      } catch (err) {
        setReviewsError('Ошибка загрузки отзывов');
        console.error('Error loading reviews:', err);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [productData]);

  // Функция добавления в корзину
  const handleAddToCart = () => {
    if (!productData) return;
    
    // Create product object for cart
    const productForCart = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image,
      quantity: quantity
    };
    
    addToCart(productForCart);
    setAddedToCart(true);
    
    // Reset button text after 1.5 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
  };

  
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.username.trim() || !reviewForm.comment.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      const newReview = await addReview(
        productData.id.toString(),
        reviewForm.username,
        reviewForm.rating,
        reviewForm.comment,
        null 
      );
      
      setReviews(prev => [newReview, ...prev]);
      
     
      setReviewForm({
        username: '',
        rating: 5,
        comment: ''
      });
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Ошибка при добавлении отзыва. Попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  
  const handleDeleteReview = async (reviewId) => {
    try {
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      
      await deleteReview(reviewId);
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Ошибка при удалении отзыва');
    }
  };

  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="loading">Загрузка товара...</div>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="error">Ошибка загрузки: {error || 'Товар не найден'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-content glass">
          {/* Изображение товара */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img src={productData.image} alt={productData.name} />
            </div>
          </div>
          
          {/* Информация о товаре */}
          <div className="product-info-section">
            <div className="product-brand">{productData.brand}</div>
            <h1 className="product-name">{productData.name}</h1>
            <div className="product-price">{productData.price} $</div>
            
            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">Категория:</span>
                <span className="detail-value">Парфюм</span>
              </div>
              
              {productData.notes && (
                <div className="detail-row">
                  <span className="detail-label">Ноты аромата:</span>
                  <span className="detail-value">{productData.notes}</span>
                </div>
              )}
            </div>
            
            <p className="product-description">{productData.description}</p>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <button className="btn btn-primary" onClick={handleAddToCart}>
                {addedToCart ? 'Добавлено' : 'Добавить в корзину'}
              </button>
            </div>
          </div>
        </div>
        
        
        <div className="reviews-section">
          <h2>Отзывы о товаре</h2>
          
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
          
         
          <div className="review-form">
            <h3>Оставить отзыв</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label htmlFor="username">Ваше имя</label>
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
                <label htmlFor="rating">Оценка</label>
                <select
                  id="rating"
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewChange}
                >
                  <option value={5}>★★★★★ 5 звезд</option>
                  <option value={4}>★★★★☆ 4 звезды</option>
                  <option value={3}>★★★☆☆ 3 звезды</option>
                  <option value={2}>★★☆☆☆ 2 звезды</option>
                  <option value={1}>★☆☆☆☆ 1 звезда</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Комментарий</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleReviewChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-review-btn"
                disabled={submitting}
              >
                {submitting ? 'Отправка...' : 'Оставить отзыв'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Похожие товары */}
        <div className="similar-products">
          <h2 className="section-title">Похожие ароматы</h2>
          <div className="products-grid grid">
            {similarProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;