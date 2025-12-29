import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/card.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
            <img src={product.image} alt={product.name} />
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <div className="image-overlay">
              <button className="quick-add" onClick={handleAddToCart}>+</button>
            </div>
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-meta">
            <span className="product-brand">{product.brand}</span>
            <div className="product-rating-stock">
              <span className="product-rating">
                <span className="stars">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="rating-value">{product.rating}</span>
              </span>
              <span className="product-stock">
                {product.stock > 0 ? `В наличии: ${product.stock} шт.` : 'Нет в наличии'}
              </span>
            </div>
          </div>
          <div className="product-footer">
            <div className="price-and-btn">
              <div className="product-price">{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}</div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>В корзину</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;