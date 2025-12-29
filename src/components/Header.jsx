import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/AuthContext';
import BurgerMenu from './BurgerMenu';
import '../styles/header.css';

const Header = () => {
  const { itemCount } = useCart();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>Онлайн магазин</h1>
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/brands">Бренды</Link></li>
            <li><Link to="/reviews">Отзывы</Link></li>
            {/* <li><Link to="/cart">Корзина</Link></li> */}
            {currentUser ? (
              <>
                <li><Link to="/profile">Профиль</Link></li>
                <li><button onClick={handleLogout} className="logout-btn">Выйти</button></li>
              </>
            ) : (
              <li><Link to="/login">Войти</Link></li>
            )}
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/cart" className="cart-btn">
            <span>Корзина</span>
            {itemCount > 0 && (
              <span className="cart-count">{itemCount}</span>
            )}
          </Link>
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;