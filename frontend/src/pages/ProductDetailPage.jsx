import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, getReviews, getRatingStats, deleteReview } from '../services/api.js';
import StarRating from '../components/StarRating.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import RatingBreakdown from '../components/RatingBreakdown.jsx';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [pRes, rRes, sRes] = await Promise.all([
        getProduct(id),
        getReviews(id),
        getRatingStats(id),
      ]);
      setProduct(pRes.data);
      setReviews(rRes.data);
      setStats(sRes.data);
    } catch {
      setError('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    // refresh stats
    getRatingStats(id).then(r => setStats(r.data)).catch(() => {});
    getProduct(id).then(r => setProduct(r.data)).catch(() => {});
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
      getRatingStats(id).then(r => setStats(r.data)).catch(() => {});
    } catch {
      alert('Failed to delete review.');
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /> Loading product…</div>;
  if (error) return (
    <div className="container">
      <div className="alert-error" style={{ margin: '40px 0' }}>{error}</div>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>← Back to Products</button>
    </div>
  );
  if (!product) return null;

  return (
    <div className="container">
      <Link to="/" className="back-link">← All Products</Link>

      {/* Product Hero */}
      <div className="product-hero card">
        {product.imageUrl && (
          <div className="hero-img">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        )}
        <div className="hero-body">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            {product.category && <span className="badge">{product.category}</span>}
          </div>
          <h1 className="hero-name">{product.name}</h1>
          {product.description && <p className="hero-desc">{product.description}</p>}
          <div className="hero-meta">
            <div className="hero-rating">
              <StarRating rating={product.averageRating || 0} size={20} />
              <span className="hero-rating-num">{product.averageRating?.toFixed(1) || '0.0'}</span>
              <span className="hero-review-count">({product.totalReviews} reviews)</span>
            </div>
            {product.price != null && (
              <span className="hero-price">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="detail-layout">
        {/* Left: Reviews */}
        <div className="reviews-col">
          <h2 className="section-title">Customer Reviews</h2>

          {stats && stats.totalReviews > 0 && <RatingBreakdown stats={stats} />}

          {reviews.length === 0 ? (
            <div className="empty-state">
              <h3>No reviews yet</h3>
              <p>Be the first to review this product!</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map(r => (
                <ReviewCard key={r.id} review={r} onDelete={handleDeleteReview} />
              ))}
            </div>
          )}
        </div>

        {/* Right: Form */}
        <div className="form-col">
          <ReviewForm productId={id} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
}
