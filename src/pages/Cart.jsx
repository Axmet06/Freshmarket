import { useCart } from '../context/CartContext';
import '../styles/cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, total } = useCart();

  // Оформление заказа
  const checkout = () => {
    alert('Переход к оформлению заказа');
    // Здесь будет логика оформления заказа
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="section-title">Корзина</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Ваша корзина пуста</p>
            <Link to="/catalog" className="btn btn-primary">Перейти в каталог</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items glass">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-brand">{item.brand}</p>
                    <p className="item-price">{item.price} $</p>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    {item.price * item.quantity} $
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary glass">
              <h3>Итого</h3>
              <div className="summary-row">
                <span>Общая стоимость:</span>
                <span className="total-amount">{total} $</span>
              </div>
              <button className="btn btn-primary checkout-btn" onClick={checkout}>
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;