import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import StarRating from './StarRating.jsx';
import { addReview } from '../services/api.js';
import './ReviewForm.css';

const INITIAL = { reviewerName: '', reviewerEmail: '', rating: 0, title: '', content: '' };

export default function ReviewForm({ productId, onReviewAdded }) {
  const { isLoggedIn, user } = useAuth();
  const [form, setForm] = useState({
    ...INITIAL,
    reviewerName: user?.username || '',
    reviewerEmail: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.reviewerName.trim()) e.reviewerName = 'Name is required';
    if (!form.reviewerEmail.trim()) e.reviewerEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.reviewerEmail)) e.reviewerEmail = 'Invalid email';
    if (!form.rating) e.rating = 'Please select a rating';
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.length < 3) e.title = 'Title must be at least 3 characters';
    if (!form.content.trim()) e.content = 'Review content is required';
    else if (form.content.length < 10) e.content = 'Content must be at least 10 characters';
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
    setLoading(true); setApiError('');
    try {
      const res = await addReview(productId, form);
      setSuccess(true);
      setForm({ ...INITIAL, reviewerName: user?.username || '', reviewerEmail: user?.email || '' });
      onReviewAdded?.(res.data);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally { setLoading(false); }
  };

  if (!isLoggedIn) {
    return (
      <div className="review-form card">
        <h3 className="review-form-title">Write a Review</h3>
        <div className="review-login-prompt">
          <div className="review-login-icon">★</div>
          <p>You need to be signed in to leave a review.</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Link to="/login" className="btn btn-primary">Sign In</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-form card">
      <h3 className="review-form-title">Write a Review</h3>

      {success && <div className="alert-success">✓ Your review has been submitted successfully!</div>}
      {apiError && <div className="alert-error">{apiError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" name="reviewerName" value={form.reviewerName}
              onChange={handleChange} placeholder="John Doe" />
            {errors.reviewerName && <span className="form-error">{errors.reviewerName}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" name="reviewerEmail" value={form.reviewerEmail}
              onChange={handleChange} placeholder="john@example.com" />
            {errors.reviewerEmail && <span className="form-error">{errors.reviewerEmail}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Rating</label>
          <div className="star-picker">
            <StarRating rating={form.rating} size={28} interactive onRate={(r) => {
              setForm(f => ({ ...f, rating: r }));
              setErrors(e => ({ ...e, rating: '' }));
            }} />
            <span className="star-label">
              {form.rating ? ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating] : 'Select a rating'}
            </span>
          </div>
          {errors.rating && <span className="form-error">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Review Title</label>
          <input className="form-input" name="title" value={form.title}
            onChange={handleChange} placeholder="Summarize your experience" />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Your Review</label>
          <textarea className="form-input" name="content" value={form.content}
            onChange={handleChange} placeholder="Share details of your experience…" rows={5} />
          <div className="char-count">{form.content.length}/2000</div>
          {errors.content && <span className="form-error">{errors.content}</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
          {loading ? <><span className="spinner" />Submitting…</> : '★ Submit Review'}
        </button>
      </form>
    </div>
  );
}
