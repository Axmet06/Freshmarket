import { Link } from 'react-router-dom';
import '../styles/card.css';

const BrandCard = ({ brand }) => {
  return (
    <div className="brand-card glass fade-in">
      <div className="brand-logo">
        <img src={brand.logo} alt={brand.name} />
      </div>
      <h3>{brand.name}</h3>
      <Link to={`/catalog?brand=${brand.id}`} className="btn btn-card">
        Посмотреть товары
      </Link>
    </div>
  );
};

export default BrandCard;