import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/burger.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu" ref={menuRef}>
      <button 
        className={`burger-icon ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`burger-overlay ${isOpen ? 'show' : ''}`}></div>

      <nav className={`burger-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={handleLinkClick}>Главная</Link>
          </li>
          <li>
            <Link to="/catalog" onClick={handleLinkClick}>Каталог</Link>
          </li>
          <li>
            <Link to="/brands" onClick={handleLinkClick}>Бренды</Link>
          </li>
          <li>
            <Link to="/reviews" onClick={handleLinkClick}>Отзывы</Link>
          </li>
          <li>
            <Link to="/cart" onClick={handleLinkClick}>
              Корзина
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLinkClick}>Войти</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;