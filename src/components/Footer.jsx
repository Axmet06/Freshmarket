import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>РОЗОВОЕ СИЯНИЕ</h3>
            <p>Эксклюзивные ароматы для тех, кто ценит красоту и качество</p>
          </div>
          <div className="footer-section">
            <h4>Каталог</h4>
            <ul>
              <li><a href="/catalog?category=women">Женские ароматы</a></li>
              <li><a href="/catalog?category=men">Мужские ароматы</a></li>
              <li><a href="/catalog?category=unisex">Унисекс</a></li>
              <li><a href="/catalog?category=sets">Подарочные наборы</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Информация</h4>
            <ul>
              <li><a href="/about">О нас</a></li>
              <li><a href="/delivery">Доставка и оплата</a></li>
              <li><a href="/warranty">Гарантия качества</a></li>
              <li><a href="/contacts">Контакты</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>Телефон: +7 (495) 123-45-67</p>
            <p>Email: info@rozovoe-siyanie.ru</p>
            <p>Адрес: Москва, ул. Цветочная, 15</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Розовое Сияние. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;