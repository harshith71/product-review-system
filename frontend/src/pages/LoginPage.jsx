import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { loginApi } from '../services/api.js';
import './AuthPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    try {
      const res = await loginApi(form);
      login(res.data);
      navigate(res.data.role === 'ROLE_ADMIN' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">★ ReviewHub</div>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to your account</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" name="username" value={form.username}
              onChange={handleChange} placeholder="Enter your username" autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? <><span className="spinner" />Signing in…</> : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Register</Link>
        </div>

        <div className="auth-demo">
          <p>Demo credentials:</p>
          <code>admin / admin123</code> &nbsp;|&nbsp; <code>user1 / user123</code>
        </div>
      </div>
    </div>
  );
}
