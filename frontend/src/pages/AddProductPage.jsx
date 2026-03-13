import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from '../services/api.js';
import './AddProductPage.css';

const INITIAL = { name: '', description: '', category: '', imageUrl: '', price: '' };

export default function AddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (form.price && isNaN(parseFloat(form.price))) e.price = 'Price must be a number';
    if (form.price && parseFloat(form.price) < 0) e.price = 'Price must be non-negative';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError('');
    try {
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : null,
      };
      const res = await createProduct(payload);
      navigate(`/products/${res.data.id}`);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="back-link">← All Products</Link>

      <div className="add-product-wrap">
        <div className="add-product-header">
          <h1>Add New Product</h1>
          <p>Fill in the details below to list a new product</p>
        </div>

        <div className="add-product-card card">
          {apiError && <div className="alert-error" style={{ marginBottom: 24 }}>{apiError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sony WH-1000XM5"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your product in detail…"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  className="form-input"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Electronics, Furniture…"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price (USD)</label>
                <input
                  className="form-input"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                {errors.price && <span className="form-error">{errors.price}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                className="form-input"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {form.imageUrl && (
              <div className="image-preview">
                <img src={form.imageUrl} alt="Preview" onError={e => e.target.style.display='none'} />
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><span className="spinner" />Creating…</> : '+ Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
