import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import './ProductsPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      else if (category) params.category = category;
      const res = await getProducts(params);
      setProducts(res.data);
    } catch {
      setError('Failed to load products. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [search, category]);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Reviews</h1>
          <p className="page-sub">Discover honest reviews from real customers</p>
        </div>
        <div className="products-count">{products.length} products</div>
      </div>

      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="form-input search-input"
            placeholder="Search products…"
            value={search}
            onChange={e => { setSearch(e.target.value); setCategory(''); }}
          />
        </div>
        <div className="category-filters">
          <button
            className={`cat-btn ${!category ? 'active' : ''}`}
            onClick={() => { setCategory(''); setSearch(''); }}
          >All</button>
          {categories.map(c => (
            <button
              key={c}
              className={`cat-btn ${category === c ? 'active' : ''}`}
              onClick={() => { setCategory(c); setSearch(''); }}
            >{c}</button>
          ))}
        </div>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: 24 }}>{error}</div>}

      {loading ? (
        <div className="loading"><div className="spinner" /> Loading products…</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
