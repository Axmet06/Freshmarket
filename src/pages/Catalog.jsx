import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/catalog.css';

import { fetchPerfumes, searchPerfumes } from '../services/perfumeApi';


const brands = [
  { id: "chanel", name: "Chanel" },
  { id: "dior", name: "Dior" },
  { id: "gucci", name: "Gucci" },
  { id: "prada", name: "Prada" },
  { id: "ysl", name: "Yves Saint Laurent" },
  { id: "dolce", name: "Dolce & Gabbana" }
];

const categories = [
  { id: "women", name: "Женские" },
  { id: "men", name: "Мужские" },
  { id: "unisex", name: "Унисекс" }
];

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const params = { limit: 20, page: page };
        
        if (selectedCategory) params.category = selectedCategory;
        if (selectedBrand) params.brand = selectedBrand;
        if (searchTerm) {
          const data = await searchPerfumes(searchTerm);
          setProducts(data);
          setFilteredProducts(data);
          setHasMore(false);
          return;
        }
        
        const data = await fetchPerfumes(params);
        if (page === 1) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          setProducts(prev => [...prev, ...data]);
          setFilteredProducts(prev => [...prev, ...data]);
        }
        
    
        setHasMore(data.length === 20);
      } catch (err) {
        setError(err.message);
        setProducts([]);
        setFilteredProducts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, selectedBrand, searchTerm, page]);

  useEffect(() => {
    let result = [...products];
    

    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [priceRange, products]);


  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedCategory('');
    setPriceRange([0, 300]);
    setPage(1);
  };


  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && products.length === 0) {
    return (
      <div className="catalog">
        <div className="container">
          <h1 className="section-title">Каталог ароматов</h1>
          <div className="loading">Загрузка товаров...</div>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="catalog">
        <div className="container">
          <h1 className="section-title">Каталог ароматов</h1>
          <div className="error">Ошибка загрузки: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog">
      <div className="container">
        <h1 className="section-title">Каталог ароматов</h1>
        
        <div className="catalog-content">
        
          <div className="filters glass">
            <h3>Фильтры</h3>
            
            <div className="filter-group">
              <label>Поиск:</label>
              <input
                type="text"
                placeholder="Название, бренд..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label>Бренд:</label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setPage(1);
                }}
                className="filter-select"
              >
                <option value="">Все бренды</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Категория:</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="filter-select"
              >
                <option value="">Все категории</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Цена: {priceRange[0]} $ - {priceRange[1]} $</label>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>
            </div>
            
            <button onClick={resetFilters} className="btn btn-secondary">
              Сбросить фильтры
            </button>
          </div>
          
          
          <div className="products-list">
            <div className="products-header">
              <p>Найдено: {filteredProducts.length} ароматов</p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <>
                <div className="products-grid grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {hasMore && (
                  <div className="load-more-container">
                    <button onClick={loadMore} className="btn btn-primary" disabled={loading}>
                      {loading ? 'Загрузка...' : 'Загрузить еще'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-products">
                <p>По вашему запросу ничего не найдено</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;