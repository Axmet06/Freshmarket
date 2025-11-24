import BrandCard from '../components/BrandCard';
import '../styles/brands.css';

// Временные данные для демонстрации
const brandData = [
  {
    id: 1,
    name: "Chanel",
    logo: "https://th.bing.com/th/id/OIF.clmVhHUQQ1po3IAagMffpg?w=357&h=59&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"
  },
  {
    id: 2,
    name: "Dior",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/2560px-Dior_Logo.svg.png"
  },
  {
    id: 3,
    name: "Gucci",
    logo: "https://tse3.mm.bing.net/th/id/OIP.Zemad1Wmdv8Zo4zU5TlJjgHaHa?pid=ImgDet&w=206&h=206&c=7&dpr=1.1&o=7&rm=3"
  },
  {
    id: 4,
    name: "Prada",
    logo: "https://www.pngall.com/wp-content/uploads/13/Prada-Logo-PNG-File.png"
  },
  {
    id: 5,
    name: "Yves Saint Laurent",
    logo: "https://th.bing.com/th/id/OIP.-LL8A10WOljdriqIwCZbUwHaHa?w=181&h=181&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"
  },
  {
    id: 6,
    name: "Dolce & Gabbana",
    logo: "data:image/webp;base64,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"
  }
];

const Brands = () => {
  return (
    <div className="brands-page">
      <div className="container">
        <h1 className="section-title">Бренды</h1>
        <div className="brands-grid grid">
          {brandData.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;