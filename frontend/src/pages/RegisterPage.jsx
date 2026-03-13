import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { registerApi } from '../services/api.js';
import './AuthPage.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
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
      const res = await registerApi({ username: form.username, email: form.email, password: form.password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">★ ReviewHub</div>
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Join and start reviewing products</p>

        {apiError && <div className="alert-error">{apiError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {[
            { name: 'username', label: 'Username', type: 'text', placeholder: 'Choose a username' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            { name: 'password', label: 'Password', type: 'password', placeholder: 'Min. 6 characters' },
            { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' },
          ].map(f => (
            <div className="form-group" key={f.name}>
              <label className="form-label">{f.label}</label>
              <input className="form-input" name={f.name} type={f.type}
                value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
              {errors[f.name] && <span className="form-error">{errors[f.name]}</span>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? <><span className="spinner" />Creating account…</> : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
