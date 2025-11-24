import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/card.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    // Prevent navigation when clicking the "Add to Cart" button
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card glass fade-in">
        {product.isNew && (
          <div className="new-label">NEW</div>
        )}
        
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="brand">{product.brand}</p>
          
          {product.description && (
            <p className="description">{product.description.substring(0, 100)}...</p>
          )}
          
          <div className="price-container">
            {product.price ? (
              <div className="price">{product.price} $</div>
            ) : (
              <div className="price">Цена по запросу</div>
            )}
            <button className="btn btn-card" onClick={handleAddToCart}>Добавить в корзину</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;